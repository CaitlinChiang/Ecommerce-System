import { ObjectId } from 'mongodb'
import { Database } from './database'
import { Dataloaders } from './dataloaders'

export interface Context {
  currentUserId?: ObjectId
  currentUserActive?: boolean
  currentUserType?: string
  database?: Database
  dataloaders?: Dataloaders
  ip?: string | string[]
}
