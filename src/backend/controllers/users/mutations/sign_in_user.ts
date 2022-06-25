import { Context } from '../../../../types/setup/context'
import { User, SignInUserArgs } from '../../../../types/user'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { generateJWT } from '../../../_utils/jwt'
import { checkIfUserExists } from '../../../_utils/helpers/checkIfUserExists'
import { checkIfPasswordsMatch } from '../../../_utils/helpers/checkIfPasswordsMatch'

export default async (
  _root: undefined,
  args: SignInUserArgs,
  context: Context
): Promise<User> => {
  authenticateUser({ admin: false }, context)

  const user = await context.database.users.findOne({ email: args.email })

  checkIfUserExists(args.email, context)
  checkIfPasswordsMatch(args.password, user)

  const token = await generateJWT(user._id)

  return { ...user, token }
}
