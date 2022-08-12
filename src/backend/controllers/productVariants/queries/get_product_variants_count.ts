import { Context } from '../../../../types/setup/context'
import { GetProductVariantArgs } from '../../../../types/productVariant'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'

export default async (
  _root: undefined,
  args: GetProductVariantArgs,
  context: Context
): Promise<number> => {
  await authenticateUser({ admin: false, context })

  const count: any = await context.database.productVariants.countDocuments(
    queryArgs(args)
  )

  return count
}
