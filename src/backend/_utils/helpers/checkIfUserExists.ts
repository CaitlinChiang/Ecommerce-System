import { UserInputError } from 'apollo-server-express'
import { Context } from '../../../types/setup/context'

export const checkIfUserExists = async (email: string, context: Context) => {
  const existingUser = await context.database.users.findOne({ email })

  if (existingUser) {
    throw new UserInputError('User with email already exists.')
  }
}
