import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { User, CreateUserArgs } from '../../../../types/user'
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

  const userId: ObjectId = await context.database.users
    .insertOne({
      ...mutateArgs(args, MutateAction.CREATE),
      active: false,
      password: hashedPassword
    })
    .then((user) => user.insertedId)

  await createAuditLog(AuditLogAction.CREATE_USER, context)

  await context.database.carts.insertOne({ _userId: userId })

  const token = await generateJWT(userId)

  return { _id: userId, ...args, token }
}
