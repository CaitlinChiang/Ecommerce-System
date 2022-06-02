import { Context } from 'types/context'
import { ProductCategory, GetProductCategoryArgs } from 'types/productCategory'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (_root: undefined, args: GetProductCategoryArgs, context: Context): Promise<ProductCategory> => {
  authenticateUser({ admin: true }, context)

  const productCategory: ProductCategory = await context.database.productCategories.findOne({ _id: args._id })
  return productCategory
}
