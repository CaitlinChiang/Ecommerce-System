import { Context } from '../../../../types/setup/context'
import { GetUserArgs } from '../../../../types/user'
import { AdminPermission } from '../../../_enums/adminPermission'
import { UserType } from '../../../_enums/userType'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnDataCount } from '../../../_utils/handleData/returnDataCount'

export default async (
  _root: undefined,
  args: GetUserArgs,
  context: Context
): Promise<number> => {
  if (args.type === UserType.ADMINISTRATOR) {
    await authenticateUser(context, true, AdminPermission.VIEW_ADMINISTRATOR)
  } else {
    await authenticateUser(context, true, AdminPermission.VIEW_CUSTOMER)
  }

  const count: number = await returnDataCount(context, args, 'users')
  return count
}
