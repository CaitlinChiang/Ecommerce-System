import bcrypt from 'bcrypt'
import { Context } from '../../../../types/setup/context'
import { User, CreateUserArgs } from '../../../../types/user'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { generateJWT } from '../../../_utils/jwt'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'
import { checkIfUserExists } from '../../../_utils/helpers/checkIfUserExists'

export default async (
  _root: undefined,
  args: CreateUserArgs,
  context: Context
): Promise<User> => {
  authenticateUser({ admin: false }, context)

  checkIfUserExists(false, args.email, context)

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
