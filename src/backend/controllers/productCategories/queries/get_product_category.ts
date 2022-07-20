import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import {
  ProductCategory,
  GetProductCategoryArgs
} from '../../../../types/productCategory'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

export default async (
  _root: undefined,
  args: GetProductCategoryArgs,
  context: Context
): Promise<ProductCategory> => {
  authenticateUser({ admin: true, context })

  const productCategory: ProductCategory =
    await context.database.productCategories.findOne({
      _id: new ObjectId(args._id)
    })

  return productCategory
}
