import { Context } from 'types/context'
import { ProductVariant, GetProductVariantArgs } from 'types/productVariant'

export default async (
  _root: undefined,
  args: GetProductVariantArgs,
  context: Context
): Promise<ProductVariant[]> => {
  const { _productId } = args

  const productVariants: any = await context.database.productVariants.find({ _productId: _productId })
  
  return productVariants
}
