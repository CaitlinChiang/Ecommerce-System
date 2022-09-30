import { UserInputError } from 'apollo-server-express'
import { Context } from '../../../types/setup/context'
import { User } from '../../../types/user'
import { UserType } from '../../_enums/userType'

export const updateUserType = async (
  context: Context,
  email: string,
  type: UserType
): Promise<boolean> => {
  const existingUser: User = await context.database.users.findOne({ email })
  if (!existingUser) return false

  const createAdmin: boolean = type === UserType.ADMINISTRATOR
  const existingAdmin: boolean = existingUser.type === UserType.ADMINISTRATOR

  const createCustomer: boolean = type === UserType.CUSTOMER
  const existingCustomer: boolean = existingUser.type === UserType.CUSTOMER

  if (existingAdmin && createCustomer) {
    throw new UserInputError('User is already an administrator. Please sign in!')
  }

  if (existingCustomer && createAdmin) {
    await context.database.users.findOneAndUpdate(
      { _id: existingUser._id },
      { $set: { type: UserType.ADMINISTRATOR } }
    )
    return true
  }
}
