import bcrypt from 'bcrypt'
import { UserInputError } from 'apollo-server-express'
import { User } from '../../../types/user'

export const validatePassword = async ({
  password,
  user,
  reset
}: {
  password: string
  user: User
  reset?: boolean
}): Promise<void> => {
  const passwordsMatch = await bcrypt.compare(password, user.password)

  if (!passwordsMatch && !reset) {
    throw new UserInputError('Incorrect password, please try again.')
  }

  if (!passwordsMatch && reset) {
    throw new UserInputError('Old password provided is incorrect.')
  }
}
