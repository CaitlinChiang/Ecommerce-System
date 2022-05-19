import { Context } from 'types/context'
import { ProductVariant, GetProductVariantArgs } from 'types/productVariant'

export default async (
  _root: undefined,
  args: GetProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  const productVariant: ProductVariant = await context.database.productVariants.findOne({ _id: args._id })
  return productVariant
}
