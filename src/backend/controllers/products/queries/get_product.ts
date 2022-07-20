import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Product, GetProductArgs } from '../../../../types/product'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

export default async (
  _root: undefined,
  args: GetProductArgs,
  context: Context
): Promise<Product> => {
  authenticateUser({ admin: false, context })

  const product: Product = await context.database.products.findOne({
    _id: new ObjectId(args._id)
  })

  return product
}
