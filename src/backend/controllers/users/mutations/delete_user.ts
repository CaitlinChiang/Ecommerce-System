import { Context } from 'types/context'
import { User, DeleteUserArgs } from 'types/user'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (
  _root: undefined,
  args: DeleteUserArgs,
  context: Context
): Promise<User> => {
  authenticateUser({ admin: true }, context)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_USER,
    userId: args._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const user: any = await context.database.users.findOneAndDelete({
    _id: args._id
  })
  return user
}
