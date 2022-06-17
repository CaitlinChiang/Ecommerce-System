import { Context } from '../../../../types/setup/context'
import {
  ProductCategory,
  GetProductCategoryArgs
} from '../../../../types/productCategory'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'
import { sortArgs } from '../../../_utils/helpers/returnSortArgs'

export default async (
  _root: undefined,
  args: GetProductCategoryArgs,
  context: Context
): Promise<ProductCategory[]> => {
  authenticateUser({ admin: false }, context)

  const productCategories: any = await context.database.productCategories
    .find(queryArgs(args))
    .sort(sortArgs(args?.paginateData))
    .skip(args?.paginateData?.offset)
    .limit(args?.paginateData?.rowsPerPage)
    .toArray()

  return productCategories
}
