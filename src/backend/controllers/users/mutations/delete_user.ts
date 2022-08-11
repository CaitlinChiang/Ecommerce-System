import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { User, DeleteUserArgs } from '../../../../types/user'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: DeleteUserArgs,
  context: Context
): Promise<User> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.DELETE_USER,
    context
  })

  const user: User = await context.database.users
    .findOneAndUpdate(
      { _id: new ObjectId(args._id) },
      { $set: mutateArgs(args, MutateAction.DELETE) },
      { returnDocument: 'after' }
    )
    .then((user) => user.value)

  await createAuditLog(AuditLogAction.DELETE_USER, context)

  await context.database.carts.findOneAndDelete({ _userId: new ObjectId(args._id) })

  return user
}
