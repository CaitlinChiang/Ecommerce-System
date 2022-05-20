import { Context } from 'types/context'
import { User, CreateUserArgs } from 'types/user'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: CreateUserArgs,
  context: Context
): Promise<User> => {
  const createUser: CreateUserArgs = {
    address: args?.address,
    email: args.email,
    firstName: args.firstName,
    lastName: args.lastName,
    password: args.password,
    phoneNumber: args.phoneNumber,
    type: args.type,
    createdAt: new Date()
  }

  const user: any = await context.database.users.insertOne(createUser)

  await context.database.carts.insertOne({ _userId: user._id })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_USER,
    userId: user._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return user
}
