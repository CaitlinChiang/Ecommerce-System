import { Context } from '../../../../types/setup/context'
import { GetProductCategoryArgs } from '../../../../types/productCategory'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'

export default async (
  _root: undefined,
  args: GetProductCategoryArgs,
  context: Context
): Promise<number> => {
  await authenticateUser({ admin: false, context })

  const count: any = await context.database.productCategories.countDocuments(
    queryArgs(args)
  )

  return count
}
