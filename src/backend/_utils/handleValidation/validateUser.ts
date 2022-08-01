import { UserInputError } from 'apollo-server-express'
import { Context } from '../../../types/setup/context'
import { User } from '../../../types/user'
import { UserType } from '../../_enums/userType'

export const validateUser = async ({
  email,
  shouldExist,
  type,
  context
}: {
  email: string
  shouldExist?: boolean
  type?: UserType
  context: Context
}): Promise<void> => {
  const existingUser: User = await context.database.users.findOne({ email })

  const existingCustomer: boolean = existingUser?.type === UserType.CUSTOMER
  const signInAdmin: boolean = type === UserType.ADMINISTRATOR

  if (signInAdmin && existingCustomer) {
    throw new UserInputError('User is not an administrator.')
  }

  if (!shouldExist && existingUser) {
    throw new UserInputError('User with email already exists.')
  }

  if (shouldExist && !existingUser) {
    throw new UserInputError('User does not exist.')
  }
}
