import { Context } from 'types/context'
import { Product, GetProductArgs } from 'types/product'

export default async (
  _root: undefined,
  args: GetProductArgs,
  context: Context
): Promise<Product> => {
  const { _id } = args

  const product: Product = await context.database.products.findOne({ _id: _id })
  
  return product
}
