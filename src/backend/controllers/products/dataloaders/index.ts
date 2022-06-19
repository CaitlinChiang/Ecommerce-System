import Dataloader from 'dataloader'
import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { Product } from '../../../../types/product'
import byId from './byId'
import byIds from './byIds'

export interface ProductDataloaders {
  byId: Dataloader<ObjectId, Product, ObjectId[]>
  byIds: Dataloader<ObjectId[], Product[], ObjectId[]>
}

export default (db: Database): ProductDataloaders => ({
  byId: new Dataloader((ids: ObjectId[]): Promise<Product[]> => byId(db, ids)),
  byIds: new Dataloader((ids: ObjectId[][]): Promise<Product[][]> => byIds(db, ids))
})
