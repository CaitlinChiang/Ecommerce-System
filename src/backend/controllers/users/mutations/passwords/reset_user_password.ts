import bcrypt from 'bcrypt'
import { UserInputError } from 'apollo-server-express'
import { Context } from '../../../../../types/setup/context'
import { User, ResetPasswordArgs } from '../../../../../types/user'
import { MutateAction } from '../../../../_enums/mutateAction'
import { AuditLogAction } from '../../../../_enums/auditLogAction'
import { authenticateUser } from '../../../../_utils/auth/authenticateUser'
import { mutationArgs } from '../../../../_utils/handleArgs/returnMutationArgs'
import { auditArgs } from '../../../../_utils/handleArgs/returnAuditArgs'
import { checkIfUserExists } from '../../../../_utils/handleValidation/checkIfUserExists'
import { validatePassword } from '../../../../_utils/handleValidation/validatePassword'

export default async (
  _root: undefined,
  args: ResetPasswordArgs,
  context: Context
): Promise<User> => {
  authenticateUser({ admin: false, context })

  await checkIfUserExists({ email: args.email, shouldExist: true, context })

  const user: User = await context.database.users.findOne({ email: args.email })

  const password = await bcrypt.hash(args.newPassword, 12)

  if (args?.oldPassword) {
    await validatePassword({ password: args.oldPassword, user, reset: true })

    await context.database.users.findOneAndUpdate(
      { email: args.email },
      { $set: mutationArgs({ password }, MutateAction.UPDATE) }
    )
  }

  if (args?.verificationCode) {
    if (args.verificationCode !== user?.verificationCode) {
      throw new UserInputError('Verification code does not exist.')
    }

    await context.database.users.findOneAndUpdate(
      { verificationCode: args.verificationCode },
      { $set: mutationArgs({ password }, MutateAction.UPDATE) }
    )
  }

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_USER,
    userId: user._id,
    ...auditArgs(context)
  })

  return user
}
