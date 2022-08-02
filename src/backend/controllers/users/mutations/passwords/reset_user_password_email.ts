import bcrypt from 'bcrypt'
import { UserInputError } from 'apollo-server-express'
import { Context } from '../../../../../types/setup/context'
import { User, ResetPasswordArgs } from '../../../../../types/user'
import { MutateAction } from '../../../../_enums/mutateAction'
import { AuditLogAction } from '../../../../_enums/auditLogAction'
import { authenticateUser } from '../../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../../_utils/handleArgs/mutateArgs'
import { auditArgs } from '../../../../_utils/handleArgs/auditArgs'
import { validateUser } from '../../../../_utils/handleValidation/validateUser'

export default async (
  _root: undefined,
  args: ResetPasswordArgs,
  context: Context
): Promise<User> => {
  await authenticateUser({ admin: false, context })

  await validateUser({ email: args.email, shouldExist: true, context })

  const user: User = await context.database.users.findOne({ email: args.email })

  const password = await bcrypt.hash(args.newPassword, 12)

  if (args.verificationCode !== user?.verificationCode) {
    throw new UserInputError('Verification code does not exist.')
  }

  await context.database.users.findOneAndUpdate(
    { verificationCode: args.verificationCode },
    { $set: mutateArgs({ password }, MutateAction.UPDATE) }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_USER,
    userId: user._id,
    ...auditArgs(context)
  })

  return user
}
