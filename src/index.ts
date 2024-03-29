import 'graphql-import-node'
import * as dotenv from 'dotenv'
import * as mongoDB from 'mongodb'
import {
  ApolloServer,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
  ExpressContext
} from 'apollo-server-express'
import { GraphQLFormattedError, GraphQLError } from 'graphql'
import { graphqlUploadExpress } from 'graphql-upload'
import cors from 'cors'
import express from 'express'
import next from 'next'
import { parse } from 'url'
import dbSetup from './backend/_utils/setup/database'
import { Context } from './types/setup/context'
import { Database } from './types/setup/database'
import { typeDefs, resolvers, buildDataloaders } from './backend/controllers'
import returnCurrentUser from './backend/_utils/auth/returnCurrentUser'

const app = express()
app.set('trust proxy', true)
app.use(cors())

const dev = process.env.NODE_ENV !== 'production'
const nextJSApp = next({ dir: './src/frontend', dev })
const handle = nextJSApp.getRequestHandler()

nextJSApp.prepare().then(async () => {
  dotenv.config()

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONNECTION_STRING
  )
  await client.connect()
  const db: mongoDB.Db = client.db(process.env.DB_NAME)
  const database: Database = dbSetup(db)

  const context = async (context: ExpressContext): Promise<Context> => {
    const headers = context.req.headers
    const ip =
      headers['CF-Connecting-IP'] || headers['X-Forwarded-For'] || context.req.ip

    const user = await returnCurrentUser(headers, database)

    return {
      database,
      dataloaders: buildDataloaders(database),
      ip,
      userId: user?._id,
      userActive: user?.active,
      userPermissions: user?.permissions,
      userType: user?.type
    }
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    formatError: (error: GraphQLError): GraphQLFormattedError => {
      if (
        !(
          error.originalError instanceof AuthenticationError ||
          error.originalError instanceof ForbiddenError ||
          error.originalError instanceof UserInputError
        )
      ) {
        console.error(error)
      }
      return error
    }
  })

  global.context = context

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

  await server.start()

  server.applyMiddleware({ app, path: '/graphql' })

  app.use((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  app.listen(process.env.PORT || 4000, () => {
    console.log(`Server Ready on port ${process.env.PORT || 4000}`)
  })
})
