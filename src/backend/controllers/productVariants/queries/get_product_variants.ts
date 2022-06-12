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
): Promise<ProductVariant[]> => {
  authenticateUser({ admin: false }, context)

  const productVariants: any = await context.database.productVariants.find(args)
  return productVariants
}
