import bcrypt from 'bcrypt'
import { UserInputError } from 'apollo-server-express'
import { Context } from '../../../../../types/setup/context'
import { User, ResetPasswordArgs } from '../../../../../types/user'
import { MutateAction } from '../../../../_enums/mutateAction'
import { AuditLogAction } from '../../../../_enums/auditLogAction'
import { authenticateUser } from '../../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../../_utils/handleArgs/mutateArgs'
import { createAuditLog } from '../../../../_utils/handleData/createAuditLog'
import { validateUser } from '../../../../_utils/handleValidation/validateUser'

export default async (
  _root: undefined,
  args: ResetPasswordArgs,
  context: Context
): Promise<User> => {
  await authenticateUser({ admin: false, context })

  await validateUser({ email: args.email, shouldExist: true, context })

  const currentUser: User = await context.database.users.findOne({
    email: args.email
  })

  const password = await bcrypt.hash(args.newPassword, 12)

  if (args.verificationCode !== currentUser?.verificationCode) {
    throw new UserInputError('Verification code does not exist.')
  }

  const updatedUser: User = await context.database.users
    .findOneAndUpdate(
      { verificationCode: args.verificationCode },
      { $set: mutateArgs({ password }, MutateAction.UPDATE) },
      { returnDocument: 'after' }
    )
    .then((user) => user.value)

  await createAuditLog(AuditLogAction.UPDATE_USER, context)

  return updatedUser
}
