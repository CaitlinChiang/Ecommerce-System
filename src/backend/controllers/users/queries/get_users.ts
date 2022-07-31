import { Context } from '../../../../types/setup/context'
import { User, GetUserArgs } from '../../../../types/user'
import { AdminPermission } from '../../../_enums/adminPermission'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'
import { sort, skip, limit } from '../../../_utils/handleArgs/paginateArgs'

export default async (
  _root: undefined,
  args: GetUserArgs,
  context: Context
): Promise<User[]> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.VIEW_USER,
    context
  })

  const users: User[] = await context.database.users
    .find(queryArgs(args))
    .sort(sort(args?.paginateData))
    .skip(skip(args?.paginateData))
    .limit(limit(args?.paginateData))
    .toArray()

  return users
}
