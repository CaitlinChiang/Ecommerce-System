import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { CreateUserArgs } from '../../../../types/user'
import { AdminPermission } from '../../../_enums/adminPermission'
import { UserType } from '../../../_enums/userType'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'
import { validateUser } from '../../../_utils/handleValidation/validateUser'
import { updateUserType } from '../../../_utils/handleData/updateUserType'
import { generateJWT } from '../../../_utils/auth/jwt'

export default async (
  _root: undefined,
  args: CreateUserArgs,
  context: Context
): Promise<string> => {
  if (args.type === UserType.ADMINISTRATOR) {
    await authenticateUser(context, true, AdminPermission.CREATE_ADMINISTRATOR)
  } else {
    await authenticateUser(context, false)
  }

  const updateUser: boolean = await updateUserType(context, args.email, args.type)
  if (updateUser) return

  await validateUser({ context, email: args.email })

  const hashedPassword = await bcrypt.hash(args.password, 12)

  const userId: ObjectId = await context.database.users
    .insertOne({
      ...mutateArgs(context, args, MutateAction.CREATE),
      active: false,
      password: hashedPassword
    })
    .then((user) => user.insertedId)

  await createAuditLog(context, AuditLogAction.CREATE_USER)

  await context.database.carts.insertOne({ _userId: userId })

  const token = await generateJWT(userId)
  return token
}
