import { Context } from '../../../../types/setup/context'
import {
  ProductCategory,
  GetProductCategoryArgs
} from '../../../../types/productCategory'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnData } from '../../../_utils/handleData/returnData'

export default async (
  _root: undefined,
  args: GetProductCategoryArgs,
  context: Context
): Promise<ProductCategory> => {
  await authenticateUser(context, false)

  const productCategory: ProductCategory = await returnData(
    context,
    args,
    'productCategories'
  )
  return productCategory
}
