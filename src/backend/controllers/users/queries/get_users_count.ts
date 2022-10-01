import { Context } from '../../../../types/setup/context'
import { GetUserArgs } from '../../../../types/user'
import { AdminPermission } from '../../../_enums/adminPermission'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnDataCount } from '../../../_utils/handleData/returnDataCount'

export default async (
  _root: undefined,
  args: GetUserArgs,
  context: Context
): Promise<number> => {
  await authenticateUser(context, true, AdminPermission.VIEW_USER)

  const count: number = await returnDataCount(context, args, 'users')
  return count
}
