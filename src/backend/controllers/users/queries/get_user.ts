import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { User, GetUserArgs } from '../../../../types/user'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

export default async (
  _root: undefined,
  args: GetUserArgs,
  context: Context
): Promise<User> => {
  await authenticateUser({ admin: false, context })

  const user: User = await context.database.users.findOne({
    _id: args?._id ? new ObjectId(args._id) : context.userId
  })

  return user
}
