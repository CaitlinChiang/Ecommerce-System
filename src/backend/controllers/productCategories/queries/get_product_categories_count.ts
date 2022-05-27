import { Context } from 'types/context'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  const productCategoriesCount: number = await context.database.productCategories.countDocuments()
  
  return productCategoriesCount
}
