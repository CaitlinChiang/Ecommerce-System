import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { User, DeleteUserArgs } from '../../../../types/user'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutationArgs } from '../../../_utils/handleArgs/returnMutationArgs'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'

export default async (
  _root: undefined,
  args: DeleteUserArgs,
  context: Context
): Promise<User> => {
  await authenticateUser({ admin: true, permission: AdminPermission.DELETE_USER, context })

  const user: any = await context.database.users.findOneAndUpdate(
    { _id: new ObjectId(args._id) },
    { $set: mutationArgs(args, MutateAction.DELETE) }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_USER,
    userId: new ObjectId(args._id),
    ...auditArgs(context)
  })

  await context.database.carts.findOneAndDelete({ _userId: new ObjectId(args._id) })

  return user
}
