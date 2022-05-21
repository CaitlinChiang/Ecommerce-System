import { Context } from 'types/context'
import { GetProductVariantArgs } from 'types/productVariant'

export default async (
  _root: undefined,
  args: GetProductVariantArgs,
  context: Context
): Promise<number> => {
  const { _productId } = args

  const productVariantsCount: number = await context.database.productVariants.countDocuments({ _productId: _productId })

  return productVariantsCount
}
