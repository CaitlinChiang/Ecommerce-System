import Dataloader from 'dataloader'
import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { City } from '../../../../types/city'
import byId from './byId'

export interface CityDataloaders {
  byId: Dataloader<ObjectId, City, ObjectId[]>
}

export default (db: Database): CityDataloaders => ({
  byId: new Dataloader((ids: ObjectId[]): Promise<City[]> => byId(db, ids))
})
