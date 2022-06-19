import { groupBy } from 'lodash'
import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { ProductVariant } from '../../../../types/productVariant'

export default async (
  db: Database,
  ids: ObjectId[]
): Promise<ProductVariant[][]> => {
  const productVariants: ProductVariant[] = await db.productVariants
    .find({ _productId: { $in: ids } })
    .toArray()

  const productVariantsById = groupBy(productVariants, '_productId')

  return ids.map((id: ObjectId): ProductVariant[] => productVariantsById[String(id)])
}
