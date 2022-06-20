import { Context } from '../../../../types/setup/context'
import { User, GetUserArgs } from '../../../../types/user'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'
import { sortArgs } from '../../../_utils/helpers/returnSortArgs'

export default async (
  _root: undefined,
  args: GetUserArgs,
  context: Context
): Promise<User[]> => {
  authenticateUser({ admin: true }, context)

  const users: any = await context.database.users
    .find(queryArgs(args))
    .sort(sortArgs(args?.paginateData))
    .skip(args?.paginateData?.offset || 0)
    .limit(args?.paginateData?.rowsPerPage || 200)
    .toArray()

  return users
}
