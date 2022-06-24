import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { ProductVariant } from '../../../../types/productVariant'

export default async (db: Database, ids: ObjectId[]): Promise<ProductVariant[]> => {
  const productVariants: ProductVariant[] = await db.productVariants
    .find({ _id: { $in: ids } })
    .toArray()

  const productVariantsById: { [id: string]: ProductVariant } = {}

  productVariants.forEach((productVariant: ProductVariant): void => {
    productVariantsById[String(productVariant._id)] = productVariant
  })

  return ids.map((id: ObjectId): ProductVariant => productVariantsById[String(id)])
}
