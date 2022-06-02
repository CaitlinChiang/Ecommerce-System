import { Context } from 'types/context'
import { ProductCategory } from 'types/productCategory'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<ProductCategory[]> => {
  authenticateUser({ admin: false }, context)

  const productCategories: any = await context.database.productCategories.find({})
  return productCategories
}
