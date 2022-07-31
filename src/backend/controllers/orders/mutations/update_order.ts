import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Order, UpdateOrderArgs } from '../../../../types/order'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { auditArgs } from '../../../_utils/handleArgs/auditArgs'

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

  const order: any = await context.database.orders.findOneAndUpdate(
    { _id: new ObjectId(args._id) },
    { $set: mutateArgs(args, MutateAction.UPDATE) }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_ORDER,
    orderId: new ObjectId(order._id),
    ...auditArgs(context)
  })

  return order.value
}
