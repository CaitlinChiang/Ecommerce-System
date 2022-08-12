import { Context } from '../../../../../types/setup/context'
import { ForgotPasswordArgs } from '../../../../../types/user'
import { MutateAction } from '../../../../_enums/mutateAction'
import { authenticateUser } from '../../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../../_utils/handleArgs/mutateArgs'
import { validateUser } from '../../../../_utils/handleValidation/validateUser'
import { sendVerificationCode } from '../../../../_utils/handleMail/sendVerificationCode'

export default async (
  _root: undefined,
  args: ForgotPasswordArgs,
  context: Context
): Promise<void> => {
  await authenticateUser({ admin: false, context })

  await validateUser({
    email: args.email,
    shouldExist: true,
    type: args.type,
    context
  })

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()

  await context.database.users.findOneAndUpdate(
    { email: args.email },
    { $set: mutateArgs({ verificationCode }, MutateAction.UPDATE) }
  )

  await sendVerificationCode(verificationCode)
}
