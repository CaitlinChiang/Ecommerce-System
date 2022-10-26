import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { DeleteUserArgs } from '../../../../types/user'
import { AdminPermission } from '../../../_enums/adminPermission'
import { UserType } from '../../../_enums/userType'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: DeleteUserArgs,
  context: Context
): Promise<void> => {
  if (args.type === UserType.ADMINISTRATOR) {
    await authenticateUser(context, true, AdminPermission.DELETE_ADMINISTRATOR)
  } else {
    await authenticateUser(context, true, AdminPermission.DELETE_CUSTOMER)
  }

  await context.database.users.findOneAndUpdate(
    { _id: new ObjectId(args._id) },
    {
      $set: {
        ...mutateArgs(context, args, MutateAction.DELETE),
        active: false
      }
    }
  )

  await createAuditLog(context, AuditLogAction.DELETE_USER)

  await context.database.carts.findOneAndDelete({ _userId: new ObjectId(args._id) })
}
