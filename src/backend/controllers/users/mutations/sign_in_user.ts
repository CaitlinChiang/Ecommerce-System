import { Context } from '../../../../types/setup/context'
import { User, SignInUserArgs } from '../../../../types/user'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { validateUser } from '../../../_utils/handleValidations/validateUser'
import { validatePassword } from '../../../_utils/handleValidations/validatePassword'
import { generateJWT } from '../../../_utils/auth/jwt'

export default async (
  _root: undefined,
  args: SignInUserArgs,
  context: Context
): Promise<string> => {
  await authenticateUser(context, false)

  await validateUser({
    context,
    email: args.email,
    shouldExist: true,
    type: args.type
  })

  const user: User = await context.database.users.findOne({ email: args.email })

  await validatePassword({ password: args.password, user })

  const token = await generateJWT(user._id)
  return token
}
