import { Context } from '../../../../types/setup/context'
import { User, DeleteUserArgs } from '../../../../types/user'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: DeleteUserArgs,
  context: Context
): Promise<User> => {
  authenticateUser({ admin: true }, context)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_USER,
    userId: args._id,
    ...auditArgs(context)
  })

  const user: any = await context.database.users.findOneAndDelete({
    _id: args._id
  })
  return user
}
