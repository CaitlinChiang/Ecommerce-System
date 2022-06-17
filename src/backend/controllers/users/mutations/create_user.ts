import { Context } from '../../../../types/setup/context'
import { User, CreateUserArgs } from '../../../../types/user'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { UserInputError } from 'apollo-server-express'
import bcrypt from 'bcrypt'
import { generateJWT } from '../../../_utils/jwt'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: CreateUserArgs,
  context: Context
): Promise<User> => {
  authenticateUser({ admin: false }, context)

  const existingUser = await context.database.users.findOne({
    email: args.email
  })
  if (existingUser) {
    throw new UserInputError('User with email already exists.')
  }

  const hashedPassword = await bcrypt.hash(args.password, 12)

  const user: any = await context.database.users.insertOne({
    ...mutationArgs(args, MutateAction.CREATE),
    password: hashedPassword
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_USER,
    userId: user._id,
    ...auditArgs(context)
  })

  await context.database.carts.insertOne({ _userId: user._id })

  const token = await generateJWT(existingUser._id)

  return { ...user, token }
}
