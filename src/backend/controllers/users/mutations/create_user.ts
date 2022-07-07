import bcrypt from 'bcrypt'
import { Context } from '../../../../types/setup/context'
import { User, CreateUserArgs } from '../../../../types/user'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { generateJWT } from '../../../_utils/auth/jwt'
import { mutationArgs } from '../../../_utils/handleArgs/returnMutationArgs'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'
import { checkIfUserExists } from '../../../_utils/handleValidation/checkIfUserExists'

export default async (
  _root: undefined,
  args: CreateUserArgs,
  context: Context
): Promise<User> => {
  authenticateUser({ admin: false }, context)

  await checkIfUserExists(args.email, false, context)

  const hashedPassword = await bcrypt.hash(args.password, 12)

  const user: any = await context.database.users.insertOne({
    ...mutationArgs(args, MutateAction.CREATE),
    active: false,
    password: hashedPassword
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_USER,
    userId: user.insertedId,
    ...auditArgs(context)
  })

  await context.database.carts.insertOne({ _userId: user.insertedId })

  const token = await generateJWT(user.insertedId)

  return { ...user, token }
}
