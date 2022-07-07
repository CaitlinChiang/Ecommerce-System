import { ObjectId } from 'mongodb'
import { Context } from '../../../types/setup/context'
import { User } from '../../../types/user'

export const searchUser = async (
  modifiedArgs: any,
  searchText: string,
  context: Context
): Promise<void> => {
  if (!searchText) return

  const users: User[] = await context.database.users.find(modifiedArgs).toArray()

  delete modifiedArgs['$text']

  modifiedArgs.userId = {
    $in: users.map((user: User): ObjectId => new ObjectId(user._id))
  }
}
