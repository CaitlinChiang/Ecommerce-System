import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { User, DeleteUserArgs } from '../../../../types/user'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: DeleteUserArgs,
  context: Context
): Promise<User> => {
  authenticateUser({ admin: true }, context)

  const user: any = await context.database.users.findOneAndUpdate(
    { _id: new ObjectId(args._id) },
    { $set: mutationArgs(args, MutateAction.DELETE) }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_USER,
    userId: new ObjectId(args._id),
    ...auditArgs(context)
  })

  return user
}
