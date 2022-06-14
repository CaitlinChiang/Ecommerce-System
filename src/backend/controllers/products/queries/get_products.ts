import { Context } from '../../../../types/setup/context'
import { Product } from '../../../../types/product'
import { GetProductArgs } from 'types/product'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: GetProductArgs,
  context: Context
): Promise<Product[]> => {
  authenticateUser({ admin: false }, context)

  const products: any = await context.database.products.find(queryArgs(args))
  return products
}
