import { Context } from 'types/context'
import { User, CreateUserArgs } from 'types/user'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { UserInputError } from 'apollo-server-express'
import bcrypt from 'bcrypt'
import { generateJWT } from 'backend/_utils/jwt'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (
  _root: undefined,
  args: CreateUserArgs,
  context: Context
): Promise<User> => {
  authenticateUser({ admin: false }, context)

  const { email, password } = args

  const existingUser = await context.database.users.findOne({ email })
  if (existingUser) throw new UserInputError('User with email already exists.')

  const hashedPassword = await bcrypt.hash(password, 12)

  const user: any = await context.database.users.insertOne({
    ...args,
    password: hashedPassword,
    createdAt: new Date()
  })

  await context.database.carts.insertOne({ _userId: user._id })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_USER,
    userId: user._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const token = await generateJWT(existingUser._id)
  return { ...user, token }
}
