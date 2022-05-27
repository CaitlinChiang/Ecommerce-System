import { Context } from 'types/context'
import { ProductCategory } from 'types/productCategory'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<ProductCategory[]> => {
  const productCategories: any = await context.database.productCategories.find({})
  
  return productCategories
}
