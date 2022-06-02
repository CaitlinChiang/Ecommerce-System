import { Context } from 'types/context'
import { ProductVariant, GetProductVariantArgs } from 'types/productVariant'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (
  _root: undefined,
  args: GetProductVariantArgs,
  context: Context
): Promise<ProductVariant[]> => {
  authenticateUser({ admin: false }, context)

  const productVariants: any = await context.database.productVariants.find({ _productId: args._productId })
  return productVariants
}
