import { Context } from '../../../../types/setup/context'
import { GetProductVariantArgs } from '../../../../types/productVariant'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: GetProductVariantArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: false }, context)

  const productVariantsCount: any =
    await context.database.productVariants.countDocuments(queryArgs(args))

  return productVariantsCount
}
