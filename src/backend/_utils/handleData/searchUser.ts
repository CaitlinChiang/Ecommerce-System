import { ObjectId } from 'mongodb'
import { Context } from '../../../types/setup/context'
import { User } from '../../../types/user'

export const searchUser = async (
  args: any,
  searchText: string,
  context: Context
): Promise<void> => {
  if (!searchText) return

  const users: User[] = await context.database.users.find(args).toArray()

  delete args['$text']

  args.userId = {
    $in: users.map((user: User): ObjectId => new ObjectId(user._id))
  }
}
