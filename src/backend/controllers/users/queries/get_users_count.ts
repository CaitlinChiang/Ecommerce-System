import { Context } from '../../../../types/setup/context'
import { GetUserArgs } from 'types/user'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/returnQueryArgs'

export default async (
  _root: undefined,
  args: GetUserArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: true, context })

  const usersCount: any = await context.database.users.countDocuments(
    queryArgs(args)
  )

  return usersCount
}
