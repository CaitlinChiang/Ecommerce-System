import { Context } from '../../../../types/setup/context'
import { Product, GetProductArgs } from '../../../../types/product'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/returnQueryArgs'
import { sortArgs } from '../../../_utils/handleArgs/returnSortArgs'

export default async (
  _root: undefined,
  args: GetProductArgs,
  context: Context
): Promise<Product[]> => {
  authenticateUser({ admin: false, context })

  const products: Product[] = await context.database.products
    .find(queryArgs(args))
    .sort(sortArgs(args?.paginateData))
    .skip(args?.paginateData?.page * args?.paginateData?.rowsPerPage || 0)
    .limit(args?.paginateData?.rowsPerPage || 200)
    .toArray()

  return products
}
