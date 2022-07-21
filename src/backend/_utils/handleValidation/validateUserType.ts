import { UserInputError } from 'apollo-server-express'
import { User } from '../../../types/user'
import { UserType } from '../../_enums/userType'

export const validateUserType = async ({
  type,
  user
}: {
  type: UserType
  user: User
}): Promise<void> => {
  if (type !== user.type) {
    throw new UserInputError(
      `User is not a${type === UserType.ADMINISTRATOR ? 'n' : ''} ${type}`
    )
  }
}
