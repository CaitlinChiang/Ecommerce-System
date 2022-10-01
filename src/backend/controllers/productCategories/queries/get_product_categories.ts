import { Context } from '../../../../types/setup/context'
import {
  ProductCategory,
  GetProductCategoryArgs
} from '../../../../types/productCategory'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnDataArray } from '../../../_utils/handleData/returnDataArray'

export default async (
  _root: undefined,
  args: GetProductCategoryArgs,
  context: Context
): Promise<ProductCategory[]> => {
  await authenticateUser(context, false)

  const productCategories: ProductCategory[] = await returnDataArray(
    context,
    args,
    'productCategories'
  )
  return productCategories
}
