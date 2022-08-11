import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { User, UpdateUserArgs } from '../../../../types/user'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: UpdateUserArgs,
  context: Context
): Promise<User> => {
  await authenticateUser({ admin: false, context })

  const user: User = await context.database.users
    .findOneAndUpdate(
      { _id: new ObjectId(args._id) },
      { $set: mutateArgs(args, MutateAction.UPDATE) },
      { returnDocument: 'after' }
    )
    .then((user) => user.value)

  await createAuditLog(AuditLogAction.UPDATE_USER, context)

  return user
}
