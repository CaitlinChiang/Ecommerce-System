import { Context } from 'types/context'
import { Product } from 'types/product'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<Product[]> => {
  const products: any = await context.database.products.find({})
  
  return products
}
