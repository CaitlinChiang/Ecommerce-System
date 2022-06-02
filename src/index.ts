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
import cors from 'cors'
import express from 'express'
import next from 'next'
import { parse } from 'url'
import dbSetup from 'backend/_utils/setup/database'
import { Context } from 'types/context'
import { Database } from 'types/database'
import { resolvers, typeDefs } from 'backend/controllers'
import { verifyJWT } from 'backend/_utils/jwt'

const app = express()
      app.set('trust proxy', true)
      app.use(cors())

const dev = process.env.NODE_ENV !== 'production'
const nextJSApp = next({ dir: './src/frontend', dev })
const handle = nextJSApp.getRequestHandler()

nextJSApp.prepare().then(async () => {
  dotenv.config()
  
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONNECTION_STRING)
  await client.connect()
  const db: mongoDB.Db = client.db(process.env.DB_NAME)
  const database: Database = dbSetup(db)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (context: ExpressContext): Promise<Context> => {
      const headers = context.req.headers
      const ip = headers['CF-Connecting-IP'] || headers['X-Forwarded-For'] || context.req.ip
      const user = verifyJWT(headers.accesstoken)
      
      return { 
        ip,
        currentUserId: user._id,
        currentUserType: user.type,
        database
      }
    },
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
  
  server.applyMiddleware({ app, path: '/graphql' })

  app.use((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server Ready on port ${process.env.PORT || 3000}`)
  })
})
