import bcrypt from 'bcrypt'
import { AuthenticationError } from 'apollo-server-express'
import { User } from '../../../types/user'

export const validatePassword = async (
  password: string,
  user: User
): Promise<void> => {
  const passwordsMatch = await bcrypt.compare(password, user.password)

  if (!passwordsMatch) {
    throw new AuthenticationError('Incorrect password, please try again.')
  }
}
