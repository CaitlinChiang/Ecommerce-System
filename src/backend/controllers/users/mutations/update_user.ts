import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { User, UpdateUserArgs } from '../../../../types/user'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: UpdateUserArgs,
  context: Context
): Promise<User> => {
  authenticateUser({ admin: false }, context)

  const user: any = await context.database.users.findOneAndUpdate(
    { _id: new ObjectId(args._id) },
    mutationArgs(args, MutateAction.UPDATE)
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_USER,
    userId: new ObjectId(user._id),
    ...auditArgs(context)
  })

  return user
}
