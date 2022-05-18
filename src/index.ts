import 'graphql-import-node'
import {
  ApolloServer,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
  ApolloError
} from 'apollo-server-express'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import next from 'next'
import { parse } from 'url'
import _dbSetup from './backend/_utils/dbSetup'