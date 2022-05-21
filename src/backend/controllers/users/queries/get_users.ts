import { Context } from 'types/context'
import { User } from 'types/user'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<User[]> => {
  const users: any = await context.database.users.find({})
  
  return users
}
