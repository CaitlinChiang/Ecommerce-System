import { UserInputError } from 'apollo-server-express'
import { Context } from '../../../types/setup/context'

export const checkIfUserExists = async (
  email: string,
  shouldExist: boolean,
  context: Context
): Promise<void> => {
  const existingUser = await context.database.users.findOne({ email })

  if (!shouldExist && existingUser) {
    throw new UserInputError('User with email already exists.')
  }

  if (shouldExist && !existingUser) {
    throw new UserInputError('User does not exist.')
  }
}
