import { Context } from '../../../../../types/setup/context'
import { ForgotPasswordArgs } from '../../../../../types/user'
import { MutateAction } from '../../../../_enums/mutateAction'
import { authenticateUser } from '../../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../../_utils/handleArgs/mutateArgs'
import { validateUser } from '../../../../_utils/handleValidation/validateUser'
import { sendVerificationCode } from '../../../../_utils/handleMail/send/verificationCode'

export default async (
  _root: undefined,
  args: ForgotPasswordArgs,
  context: Context
): Promise<void> => {
  await authenticateUser(context, false)

  await validateUser({
    context,
    email: args.email,
    shouldExist: true,
    type: args.type
  })

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()

  await context.database.users.findOneAndUpdate(
    { email: args.email },
    { $set: mutateArgs(context, { verificationCode }, MutateAction.UPDATE) }
  )

  await sendVerificationCode(args.email, verificationCode)
}
