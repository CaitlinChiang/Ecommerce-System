import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { User, GetUserArgs } from '../../../../types/user'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: GetUserArgs,
  context: Context
): Promise<User> => {
  authenticateUser({ admin: false }, context)

  const userId = args?._id ? new ObjectId(args._id) : context.currentUserId

  const user: User = await context.database.users.findOne({
    _id: userId
  })

  return user
}
