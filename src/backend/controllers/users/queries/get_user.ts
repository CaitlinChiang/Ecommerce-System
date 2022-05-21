import { Context } from 'types/context'
import { User, GetUserArgs } from 'types/user'

export default async (
  _root: undefined,
  args: GetUserArgs,
  context: Context
): Promise<User> => {
  const { _id } = args

  const user: User = await context.database.users.findOne({ _id: _id })

  return user
}
