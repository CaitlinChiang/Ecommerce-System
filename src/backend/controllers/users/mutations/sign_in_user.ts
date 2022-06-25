import { Context } from '../../../../types/setup/context'
import { User, SignInUserArgs } from '../../../../types/user'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { generateJWT } from '../../../_utils/jwt'
import { checkIfUserExists } from '../../../_utils/helpers/checkIfUserExists'
import { validatePassword } from '../../../_utils/helpers/validatePassword'

export default async (
  _root: undefined,
  args: SignInUserArgs,
  context: Context
): Promise<User> => {
  authenticateUser({ admin: false }, context)

  const user = await context.database.users.findOne({ email: args.email })

  checkIfUserExists(args.email, context)
  validatePassword(args.password, user)

  const token = await generateJWT(user._id)

  return { ...user, token }
}
