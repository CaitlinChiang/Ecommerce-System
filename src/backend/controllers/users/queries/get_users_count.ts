import { Context } from '../../../../types/setup/context'
import { GetUserArgs } from 'types/user'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: GetUserArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: true }, context)

  const usersCount: any = await context.database.users.countDocuments(
    queryArgs(args)
  )
  return usersCount
}
