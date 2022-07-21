import { UserInputError } from 'apollo-server-express'
import { Context } from '../../../types/setup/context'
import { User } from '../../../types/user'
import { UserType } from '../../_enums/userType'

export const validateUserType = async ({
  email,
  type,
  user,
  context
}: {
  email?: string
  type: UserType
  user?: User
  context?: Context
}): Promise<void> => {
  let userType: UserType = user?.type

  if (!userType) {
    const searchUser: User = await context.database.users.findOne({ email })

    userType = searchUser.type
  }

  if (type !== userType) {
    throw new UserInputError(
      `User is not a${type === UserType.ADMINISTRATOR ? 'n' : ''} ${type}`
    )
  }
}
