import { ObjectId } from 'mongodb'
import { Context } from '../../../types/setup/context'
import { User } from '../../../types/user'

export const searchUser = async (
  context: Context,
  args: any,
  searchText: string
): Promise<void> => {
  if (!searchText) return

  delete args['$text']

  const users: User[] = await context.database.users.find(args).toArray()
  args.userId = { $in: users.map((user: User): ObjectId => new ObjectId(user._id)) }
}
