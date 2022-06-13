import { Context } from '../../../../types/setup/context'
import { Order, DeleteOrderArgs } from '../../../../types/order'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { deletePayment } from '../../payments/mutations/delete_payment'

export default async (
  _root: undefined,
  args: DeleteOrderArgs,
  context: Context
): Promise<Order> => {
  authenticateUser({ admin: true }, context)

  await deletePayment(context, args._id, args._paymentId)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_ORDER,
    orderId: args._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const order: any = await context.database.orders.findOneAndDelete({
    _id: args._id
  })
  return order
}
