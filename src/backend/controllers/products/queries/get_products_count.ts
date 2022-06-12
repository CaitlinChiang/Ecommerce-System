import { Context } from '../../../../types/setup/context'
import { GetProductArgs } from 'types/product'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: GetProductArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: false }, context)

  const productsCount: number = await context.database.products.countDocuments(args)
  return productsCount
}
