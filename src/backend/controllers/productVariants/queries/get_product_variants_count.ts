import { Context } from '../../../../types/setup/context'
import { GetProductVariantArgs } from '../../../../types/productVariant'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnDataCount } from '../../../_utils/handleData/returnDataCount'

export default async (
  _root: undefined,
  args: GetProductVariantArgs,
  context: Context
): Promise<number> => {
  await authenticateUser(context, false)

  const count: number = await returnDataCount(context, args, 'productVariants')
  return count
}
