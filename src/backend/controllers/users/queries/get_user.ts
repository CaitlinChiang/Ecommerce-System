import { Context } from 'types/context'
import { User, GetUserArgs } from 'types/user'

export default async (
  _root: undefined,
  args: GetUserArgs,
  context: Context
): Promise<User> => {
  const user: User = await context.database.users.findOne({ _id: args._id })
  return user
}
