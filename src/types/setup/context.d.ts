import { ObjectId } from 'mongodb'
import { Database } from './database'
import { Dataloaders } from './dataloaders'
import { AdminPermission } from '../backend/_enums/adminPermission'

export interface Context {
  currentUserId?: ObjectId
  currentUserActive?: boolean
  currentUserPermissions?: AdminPermission[]
  currentUserType?: string
  database?: Database
  dataloaders?: Dataloaders
  ip?: string | string[]
}
