import { Context } from '../../../../types/setup/context'
import { User, SignInUserArgs } from '../../../../types/user'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { checkIfUserExists } from '../../../_utils/handleValidation/checkIfUserExists'
import { validatePassword } from '../../../_utils/handleValidation/validatePassword'
import { generateJWT } from '../../../_utils/auth/jwt'

export default async (
  _root: undefined,
  args: SignInUserArgs,
  context: Context
): Promise<string> => {
  authenticateUser({ admin: false, context })

  await checkIfUserExists({ email: args.email, shouldExist: true, context })

  const user: User = await context.database.users.findOne({ email: args.email })

  await validatePassword({ password: args.password, user })

  const token = await generateJWT(user._id)

  return token
}
