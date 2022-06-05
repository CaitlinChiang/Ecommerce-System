import { Context } from '../../../../types/context'
import { User, GetUserArgs } from '../../../../types/user'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: GetUserArgs,
  context: Context
): Promise<User[]> => {
  authenticateUser({ admin: true }, context)

  const users: any = await context.database.users.find(args)
  return users
}
