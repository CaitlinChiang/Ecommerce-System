import { Context } from '../../../../types/setup/context'
import { GetProductArgs } from '../../../../types/product'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/returnQueryArgs'

export default async (
  _root: undefined,
  args: GetProductArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: false }, context)

  const productsCount: any = await context.database.products.countDocuments(
    queryArgs(args)
  )

  return productsCount
}
