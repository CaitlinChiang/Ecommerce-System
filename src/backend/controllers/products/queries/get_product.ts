import { Context } from 'types/context'
import { Product, GetProductArgs } from 'types/product'

export default async (
  _root: undefined,
  args: GetProductArgs,
  context: Context
): Promise<Product> => {
  const product: Product = await context.database.products.findOne({ _id: args._id })
  return product
}