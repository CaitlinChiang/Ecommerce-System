import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { ProductVariant } from '../../../../types/productVariant'

export default async (
  context: Context,
  ids: ObjectId[]
): Promise<ProductVariant[]> => {
  const productVariants: ProductVariant[] = await context.database.productVariants
    .find({ _productId: { $in: ids } })
    .toArray()

  const productVariantsById: { [id: string]: ProductVariant } = {}

  productVariants.forEach((productVariant: ProductVariant): void => {
    productVariantsById[String(productVariant._id)] = productVariant
  })

  return ids.map((id: ObjectId): ProductVariant => productVariantsById[String(id)])
}
