import { Context } from '../../../../types/setup/context'
import { Product, GetProductArgs } from '../../../../types/product'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnData } from '../../../_utils/handleData/returnData'

export default async (
  _root: undefined,
  args: GetProductArgs,
  context: Context
): Promise<Product> => {
  await authenticateUser(context, false)

  const product: Product = await returnData(context, args, 'products')
  return product
}
