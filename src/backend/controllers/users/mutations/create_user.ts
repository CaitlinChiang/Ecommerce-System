import bcrypt from 'bcrypt'
import { Context } from '../../../../types/setup/context'
import { User, CreateUserArgs } from '../../../../types/user'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { auditArgs } from '../../../_utils/handleArgs/auditArgs'
import { validateUser } from '../../../_utils/handleValidation/validateUser'
import { updateUserType } from '../../../_utils/handleData/updateUserType'
import { generateJWT } from '../../../_utils/auth/jwt'

export default async (
  _root: undefined,
  args: CreateUserArgs,
  context: Context
): Promise<User> => {
  await authenticateUser({ admin: false, context })

  const updateUser: boolean = await updateUserType({
    email: args.email,
    type: args.type,
    context
  })

  if (updateUser) return {}

  await validateUser({ email: args.email, context })

  const hashedPassword = await bcrypt.hash(args.password, 12)

  const user: any = await context.database.users.insertOne({
    ...mutateArgs(args, MutateAction.CREATE),
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

  return { ...user.insertedId, token }
}
