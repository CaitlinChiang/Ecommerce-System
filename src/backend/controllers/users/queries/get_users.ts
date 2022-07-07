import { Context } from '../../../../types/setup/context'
import { User, GetUserArgs } from '../../../../types/user'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/returnQueryArgs'
import { sortArgs } from '../../../_utils/handleArgs/returnSortArgs'

export default async (
  _root: undefined,
  args: GetUserArgs,
  context: Context
): Promise<User[]> => {
  authenticateUser({ admin: true }, context)

  const users: User[] = await context.database.users
    .find(queryArgs(args))
    .sort(sortArgs(args?.paginateData))
    .skip(args?.paginateData?.page * args?.paginateData?.rowsPerPage || 0)
    .limit(args?.paginateData?.rowsPerPage || 200)
    .toArray()

  return users
}
