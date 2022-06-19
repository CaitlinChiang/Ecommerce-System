import Dataloader from 'dataloader'
import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { ProductVariant } from '../../../../types/productVariant'
import byIds from './byIds'
import byProductId from './byProductId'

export interface ProductVariantDataloaders {
  byIds: Dataloader<ObjectId[], ProductVariant[], ObjectId[]>
  byProductId: Dataloader<ObjectId, ProductVariant[], ObjectId[]>
}

export default (db: Database): ProductVariantDataloaders => ({
  byIds: new Dataloader(
    (ids: ObjectId[][]): Promise<ProductVariant[][]> => byIds(db, ids)
  ),
  byProductId: new Dataloader(
    (ids: ObjectId[]): Promise<ProductVariant[][]> => byProductId(db, ids)
  )
})
