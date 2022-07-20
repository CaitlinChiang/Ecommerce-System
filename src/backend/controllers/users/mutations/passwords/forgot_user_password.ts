import { Context } from '../../../../../types/setup/context'
import { ForgotPasswordArgs } from '../../../../../types/user'
import { MutateAction } from '../../../../_enums/mutateAction'
import { authenticateUser } from '../../../../_utils/auth/authenticateUser'
import { mutationArgs } from '../../../../_utils/handleArgs/returnMutationArgs'
import { checkIfUserExists } from '../../../../_utils/handleValidation/checkIfUserExists'

export default async (
  _root: undefined,
  args: ForgotPasswordArgs,
  context: Context
): Promise<void> => {
  authenticateUser({ admin: false, context })

  await checkIfUserExists({ email: args.email, shouldExist: true, context })

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()

  await context.database.users.findOneAndUpdate(
    { email: args.email },
    { $set: mutationArgs({ verificationCode }, MutateAction.UPDATE) }
  )

  // ADD FORGOT PASSWORD EMAIL CONTAINING VERIFICATION CODE
}
