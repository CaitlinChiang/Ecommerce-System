import { authenticateUser } from '../../../_utils/authenticateUser'
import { Context } from 'types/context'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: false }, context)

  const productsCount: number = await context.database.products.countDocuments()
  return productsCount
}
