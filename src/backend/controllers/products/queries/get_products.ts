import { Context } from '../../../../types/setup/context'
import { Product, GetProductArgs } from '../../../../types/product'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnDataArray } from '../../../_utils/handleData/returnDataArray'

export default async (
  _root: undefined,
  args: GetProductArgs,
  context: Context
): Promise<Product[]> => {
  await authenticateUser(context, false)

  const products: Product[] = await returnDataArray(context, args, 'products')
  return products
}
