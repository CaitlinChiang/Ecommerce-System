import { Context } from 'types/context'
import { User, CreateUserArgs } from 'types/user'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: CreateUserArgs,
  context: Context
): Promise<User> => {
  const { address, email, firstName, lastName, password, phoneNumber, type } = args

  const createUser: CreateUserArgs = {
    address: address,
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
    phoneNumber: phoneNumber,
    type: type,
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
