import { Context } from '../../../../types/setup/context'
import {
  ProductVariant,
  GetProductVariantArgs
} from '../../../../types/productVariant'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: GetProductVariantArgs,
  context: Context
): Promise<ProductVariant[]> => {
  authenticateUser({ admin: false }, context)

  const productVariants: any = await context.database.productVariants.find(
    queryArgs(args)
  )
  return productVariants
}
