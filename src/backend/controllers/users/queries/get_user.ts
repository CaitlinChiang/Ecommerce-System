import { Context } from 'types/context'
import { User, GetUserArgs } from 'types/user'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (_root: undefined, args: GetUserArgs, context: Context): Promise<User> => {
  authenticateUser({ admin: false }, context)

  const user: User = await context.database.users.findOne({ _id: args._id })
  return user
}
