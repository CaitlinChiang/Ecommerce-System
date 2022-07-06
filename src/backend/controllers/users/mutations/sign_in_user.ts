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
): Promise<string> => {
  authenticateUser({ admin: false }, context)

  checkIfUserExists(true, args.email, context)

  const user: User = await context.database.users.findOne({ email: args.email })

  validatePassword(args.password, user)

  const token = await generateJWT(user._id)

  return token
}
