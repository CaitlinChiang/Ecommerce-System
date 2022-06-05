import { Context } from '../../../../types/context'
import { User, UpdateUserArgs } from '../../../../types/user'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: UpdateUserArgs,
  context: Context
): Promise<User> => {
  authenticateUser({ admin: false }, context)

  const user: any = await context.database.users.findOneAndUpdate(
    { _id: args._id },
    { ...args, updatedAt: new Date() }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_USER,
    userId: user._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return user
}
