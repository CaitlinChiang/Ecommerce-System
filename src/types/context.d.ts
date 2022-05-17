import { ObjectId } from 'mongodb'
import { Database } from './database'

export interface Context {
  currentUserId?: ObjectId
  database?: Database
}
