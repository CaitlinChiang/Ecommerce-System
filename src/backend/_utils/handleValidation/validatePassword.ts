import bcrypt from 'bcrypt'
import { UserInputError } from 'apollo-server-express'
import { User } from '../../../types/user'

export const validatePassword = async ({
  password,
  reset,
  user
}: {
  password: string
  reset?: boolean
  user: User
}): Promise<void> => {
  const passwordsMatch = await bcrypt.compare(password, user.password)

  if (!passwordsMatch && !reset) {
    throw new UserInputError('Incorrect password, please try again.')
  }

  if (!passwordsMatch && reset) {
    throw new UserInputError('Old password provided is incorrect.')
  }
}
