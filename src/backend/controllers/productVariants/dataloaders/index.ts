import Dataloader from 'dataloader'
import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { ProductVariant } from '../../../../types/productVariant'
import byId from './byId'

export interface ProductVariantDataloaders {
  byId: Dataloader<ObjectId, ProductVariant, ObjectId[]>
}

export default (context: Context): ProductVariantDataloaders => ({
  byId: new Dataloader(
    (ids: ObjectId[]): Promise<ProductVariant[]> => byId(context, ids)
  )
})
