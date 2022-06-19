import Dataloader from 'dataloader'
import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { ProductVariant } from '../../../../types/productVariant'
import byProductId from './byProductId'

export interface ProductVariantDataloaders {
  byProductId: Dataloader<ObjectId, ProductVariant[], ObjectId[]>
}

export default (db: Database): ProductVariantDataloaders => ({
  byProductId: new Dataloader(
    (ids: ObjectId[]): Promise<ProductVariant[][]> => byProductId(db, ids)
  )
})
