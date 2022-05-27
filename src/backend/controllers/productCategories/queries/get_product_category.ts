import { Context } from 'types/context'
import { ProductCategory, GetProductCategoryArgs } from 'types/productCategory'

export default async (
  _root: undefined,
  args: GetProductCategoryArgs,
  context: Context
): Promise<ProductCategory> => {
  const { _id } = args

  const productCategory: ProductCategory = await context.database.productCategories.findOne({ _id: _id })

  return productCategory
}
