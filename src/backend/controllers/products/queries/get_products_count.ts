import { Context } from '../../../../types/setup/context'
import { GetProductArgs } from '../../../../types/product'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnDataCount } from '../../../_utils/handleData/returnDataCount'

export default async (
  _root: undefined,
  args: GetProductArgs,
  context: Context
): Promise<number> => {
  await authenticateUser(context, false)

  const count: number = await returnDataCount(context, args, 'products')
  return count
}
