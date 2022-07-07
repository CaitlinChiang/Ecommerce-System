import { ObjectId } from 'mongodb'
import { Context } from '../../../types/setup/context'
import { User } from '../../../types/user'

export const searchUser = async (
  searchText: string,
  modifiedArgs: any,
  context: Context
): Promise<any> => {
  if (!searchText) return modifiedArgs

  const users: User[] = await context.database.users.find(modifiedArgs).toArray()

  delete modifiedArgs['$text']

  modifiedArgs.userId = {
    $in: users.map((user: User): ObjectId => new ObjectId(user._id))
  }

  return modifiedArgs
}
