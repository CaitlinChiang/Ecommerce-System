import { Context } from '../../../../types/setup/context'
import { Product, GetProductArgs } from '../../../../types/product'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'
import { sort, skip, limit } from '../../../_utils/handleArgs/paginateArgs'

export default async (
  _root: undefined,
  args: GetProductArgs,
  context: Context
): Promise<Product[]> => {
  await authenticateUser({ admin: false, context })

  const products: Product[] = await context.database.products
    .find(queryArgs(args))
    .sort(sort(args?.paginateData))
    .skip(skip(args?.paginateData))
    .limit(limit(args?.paginateData))
    .toArray()

  return products
}
