import { ObjectId } from 'mongodb'
import { Database } from './database'

export interface Context {
  currentUserId?: ObjectId
  currentUserType?: string
  database?: Database
  ip?: string | string[]
}
