import Dataloader from 'dataloader'
import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { ProductVariant } from '../../../../types/productVariant'
import byIds from './byIds'

export interface ProductVariantDataloaders {
  byIds: Dataloader<ObjectId, ProductVariant[], ObjectId[]>
}

export default (db: Database): ProductVariantDataloaders => ({
  byIds: new Dataloader(
    (ids: ObjectId[]): Promise<ProductVariant[][]> => byIds(db, ids)
  )
})
