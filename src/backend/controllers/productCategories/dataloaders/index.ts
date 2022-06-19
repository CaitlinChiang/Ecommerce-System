import Dataloader from 'dataloader'
import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { ProductCategory } from '../../../../types/productCategory'
import byId from './byId'

export interface ProductCategoryDataloaders {
  byId: Dataloader<ObjectId, ProductCategory, ObjectId[]>
}

export default (db: Database): ProductCategoryDataloaders => ({
  byId: new Dataloader(
    (ids: ObjectId[]): Promise<ProductCategory[]> => byId(db, ids)
  )
})
