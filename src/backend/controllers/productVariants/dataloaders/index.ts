import Dataloader from 'dataloader'
import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { ProductVariant } from '../../../../types/productVariant'
import byId from './byId'

export interface ProductVariantDataloaders {
  byId: Dataloader<ObjectId, ProductVariant, ObjectId[]>
}

export default (db: Database): ProductVariantDataloaders => ({
  byId: new Dataloader((ids: ObjectId[]): Promise<ProductVariant[]> => byId(db, ids))
})
