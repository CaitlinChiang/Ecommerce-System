import { authenticateUser } from 'backend/_utils/authenticateUser'
import { Context } from 'types/context'
import { Product, GetProductArgs } from 'types/product'

export default async (
  _root: undefined,
  args: GetProductArgs,
  context: Context
): Promise<Product> => {
  authenticateUser({ admin: false }, context)

  const product: Product = await context.database.products.findOne({ _id: args._id })
  return product
}
