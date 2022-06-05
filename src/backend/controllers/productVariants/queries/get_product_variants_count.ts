import { Context } from '../../../../types/context'
import { GetProductVariantArgs } from '../../../../types/productVariant'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: GetProductVariantArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: false }, context)

  const productVariantsCount: number =
    await context.database.productVariants.countDocuments({
      _productId: args._productId
    })
  return productVariantsCount
}
