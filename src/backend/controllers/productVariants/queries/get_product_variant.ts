import { Context } from '../../../../types/_setup/context'
import {
  ProductVariant,
  GetProductVariantArgs
} from '../../../../types/productVariant'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: GetProductVariantArgs,
  context: Context
): Promise<ProductVariant> => {
  authenticateUser({ admin: false }, context)

  const productVariant: ProductVariant =
    await context.database.productVariants.findOne({
      _id: args._id
    })
  return productVariant
}
