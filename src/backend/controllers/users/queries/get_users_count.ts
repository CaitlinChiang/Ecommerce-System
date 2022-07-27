import { Context } from '../../../../types/setup/context'
import { GetUserArgs } from '../../../../types/user'
import { AdminPermission } from '../../../_enums/adminPermission'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/returnQueryArgs'

export default async (
  _root: undefined,
  args: GetUserArgs,
  context: Context
): Promise<number> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.VIEW_USER,
    context
  })

  const usersCount: any = await context.database.users.countDocuments(
    queryArgs(args)
  )

  return usersCount
}
