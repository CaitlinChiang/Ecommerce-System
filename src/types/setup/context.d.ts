import { ObjectId } from 'mongodb'
import { Database } from './database'
import { Dataloaders } from './dataloaders'
import { AdminPermission } from '../backend/_enums/adminPermission'

export interface Context {
  database?: Database
  dataloaders?: Dataloaders
  ip?: string | string[]
  userId?: ObjectId
  userActive?: boolean
  userPermissions?: AdminPermission[]
  userType?: string
}
