import { ObjectId } from 'mongodb'
import { Database } from './database'

export interface Context {
  ip?: string | string[]
  currentUserId?: ObjectId
  database?: Database
}
