import { Context } from '../../../../types/setup/context'
import {
  ProductCategory,
  GetProductCategoryArgs
} from '../../../../types/productCategory'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'
import { sort, skip, limit } from '../../../_utils/handleArgs/paginateArgs'

export default async (
  _root: undefined,
  args: GetProductCategoryArgs,
  context: Context
): Promise<ProductCategory[]> => {
  await authenticateUser({ admin: false, context })

  const productCategories: ProductCategory[] =
    await context.database.productCategories
      .find(queryArgs(args))
      .sort(sort(args?.paginateData))
      .skip(skip(args?.paginateData))
      .limit(limit(args?.paginateData))
      .toArray()

  return productCategories
}
