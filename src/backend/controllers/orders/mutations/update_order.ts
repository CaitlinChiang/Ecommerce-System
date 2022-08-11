import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Order, UpdateOrderArgs } from '../../../../types/order'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: UpdateOrderArgs,
  context: Context
): Promise<Order> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.UPDATE_ORDER,
    context
  })

  const order: Order = await context.database.orders
    .findOneAndUpdate(
      { _id: new ObjectId(args._id) },
      { $set: mutateArgs(args, MutateAction.UPDATE) },
      { returnDocument: 'after' }
    )
    .then((order) => order.value)

  await createAuditLog(AuditLogAction.UPDATE_ORDER, context)

  return order
}
