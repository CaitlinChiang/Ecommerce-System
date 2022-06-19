import Dataloader from 'dataloader'
import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { User } from '../../../../types/user'
import byId from './byId'

export interface UserDataloaders {
  byId: Dataloader<ObjectId, User, ObjectId[]>
}

export default (db: Database): UserDataloaders => ({
  byId: new Dataloader((ids: ObjectId[]): Promise<User[]> => byId(db, ids))
})
