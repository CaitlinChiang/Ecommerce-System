import { Context } from '../../../../types/setup/context'
import { User, GetUserArgs } from '../../../../types/user'
import { AdminPermission } from '../../../_enums/adminPermission'
import { UserType } from '../../../_enums/userType'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnDataArray } from '../../../_utils/handleData/returnDataArray'

export default async (
  _root: undefined,
  args: GetUserArgs,
  context: Context
): Promise<User[]> => {
  if (args.type === UserType.ADMINISTRATOR) {
    await authenticateUser(context, true, AdminPermission.VIEW_ADMINISTRATOR)
  } else {
    await authenticateUser(context, true, AdminPermission.VIEW_CUSTOMER)
  }

  const users: User[] = await returnDataArray(context, args, 'users')
  return users
}
