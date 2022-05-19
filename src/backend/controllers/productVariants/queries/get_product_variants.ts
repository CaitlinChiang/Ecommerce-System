import { Context } from 'types/context'
import { ProductVariant, GetProductVariantArgs } from 'types/productVariant'

export default async (
  _root: undefined,
  args: GetProductVariantArgs,
  context: Context
): Promise<ProductVariant[]> => {
  const productVariants: any = await context.database.productVariants.find({ _productId: args._productId })
  return productVariants
}
