import { Context } from '../../../../types/_setup/context'
import { User, GetUserArgs } from '../../../../types/user'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: GetUserArgs,
  context: Context
): Promise<User> => {
  authenticateUser({ admin: false }, context)

  const user: User = await context.database.users.findOne({ _id: args._id })
  return user
}
