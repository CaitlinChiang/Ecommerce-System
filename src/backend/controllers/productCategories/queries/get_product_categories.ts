import { Context } from '../../../../types/setup/context'
import {
  ProductCategory,
  GetProductCategoryArgs
} from '../../../../types/productCategory'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/returnQueryArgs'
import { sortArgs } from '../../../_utils/handleArgs/returnSortArgs'

export default async (
  _root: undefined,
  args: GetProductCategoryArgs,
  context: Context
): Promise<ProductCategory[]> => {
  authenticateUser({ admin: false, context })

  const productCategories: ProductCategory[] =
    await context.database.productCategories
      .find(queryArgs(args))
      .sort(sortArgs(args?.paginateData))
      .skip(args?.paginateData?.page * args?.paginateData?.rowsPerPage || 0)
      .limit(args?.paginateData?.rowsPerPage || 200)
      .toArray()

  return productCategories
}
