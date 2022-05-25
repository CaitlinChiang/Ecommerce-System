import { Context } from 'types/context'
import { User, UpdateUserArgs } from 'types/user'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: UpdateUserArgs,
  context: Context
): Promise<User> => {
  const updateUser: Partial<UpdateUserArgs> = {
    address: args?.address,
    email: args.email,
    password: args.password,
    phoneNumber: args.phoneNumber,
    updatedAt: new Date()
  }
  const user: any = await context.database.users.findOneAndUpdate({ _id: args._id }, updateUser)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_USER,
    userId: user._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return user
}
