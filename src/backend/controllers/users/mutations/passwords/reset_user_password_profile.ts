import bcrypt from 'bcrypt'
import { Context } from '../../../../../types/setup/context'
import { User, ResetPasswordArgs } from '../../../../../types/user'
import { MutateAction } from '../../../../_enums/mutateAction'
import { AuditLogAction } from '../../../../_enums/auditLogAction'
import { authenticateUser } from '../../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../../_utils/handleArgs/mutateArgs'
import { createAuditLog } from '../../../../_utils/handleData/createAuditLog'
import { validateUser } from '../../../../_utils/handleValidation/validateUser'
import { validatePassword } from '../../../../_utils/handleValidation/validatePassword'

export default async (
  _root: undefined,
  args: ResetPasswordArgs,
  context: Context
): Promise<User> => {
  await authenticateUser(context, false)

  await validateUser({ context, email: args.email, shouldExist: true })

  const currentUser: User = await context.database.users.findOne({
    email: args.email
  })

  const password = await bcrypt.hash(args.newPassword, 12)

  await validatePassword({
    password: args.oldPassword,
    reset: true,
    user: currentUser
  })

  const updatedUser: User = await context.database.users
    .findOneAndUpdate(
      { email: args.email },
      { $set: mutateArgs({ password }, MutateAction.UPDATE) },
      { returnDocument: 'after' }
    )
    .then((user) => user.value)

  await createAuditLog(context, AuditLogAction.UPDATE_USER)

  return updatedUser
}
