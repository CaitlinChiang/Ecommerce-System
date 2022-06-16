import { Context } from '../../../../types/setup/context'
import { GetProductCategoryArgs } from '../../../../types/productCategory'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: GetProductCategoryArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: true }, context)

  const productCategoriesCount: any =
    await context.database.productCategories.countDocuments(queryArgs(args))

  return productCategoriesCount
}
