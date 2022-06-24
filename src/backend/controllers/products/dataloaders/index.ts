import Dataloader from 'dataloader'
import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { Product } from '../../../../types/product'
import byId from './byId'

export interface ProductDataloaders {
  byId: Dataloader<ObjectId, Product, ObjectId[]>
}

export default (db: Database): ProductDataloaders => ({
  byId: new Dataloader((ids: ObjectId[]): Promise<Product[]> => byId(db, ids))
})
