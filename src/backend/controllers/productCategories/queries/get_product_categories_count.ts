import { Context } from '../../../../types/setup/context'
import { GetProductCategoryArgs } from '../../../../types/productCategory'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnDataCount } from '../../../_utils/handleData/returnDataCount'

export default async (
  _root: undefined,
  args: GetProductCategoryArgs,
  context: Context
): Promise<number> => {
  await authenticateUser(context, false)

  const count: number = await returnDataCount(context, args, 'productCategories')
  return count
}
