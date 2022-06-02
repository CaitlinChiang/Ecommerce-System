import { Context } from 'types/context'
import { User, SignInUserArgs } from 'types/user'
import { AuthenticationError } from 'apollo-server-express'
import bcrypt from 'bcrypt'
import { generateJWT } from 'backend/_utils/jwt'

export default async (
  _root: undefined,
  args: SignInUserArgs,
  context: Context
): Promise<User> => {
  const { email, password } = args

  const existingUser = await context.database.users.findOne({ email: email })
  if (!existingUser) throw new AuthenticationError('Invalid email, please try again.')

  const validatePassword = await bcrypt.compare(password, existingUser.password)
  if (!validatePassword) throw new AuthenticationError('Incorrect password, please try again.')

  const token = await generateJWT(existingUser._id)
  
  return { ...existingUser, token }
}
