import { Context } from '../../../../types/context'
import { GetUserArgs } from 'types/user'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: GetUserArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: true }, context)

  const usersCount: number = await context.database.users.countDocuments(args)
  return usersCount
}
