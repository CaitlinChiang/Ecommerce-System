import { Context } from '../../../../types/setup/context'
import { Order, DeleteOrderArgs } from '../../../../types/order'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { handleDeleteImage } from '../../../_utils/handleImages/deleteImage'

export default async (
  _root: undefined,
  args: DeleteOrderArgs,
  context: Context
): Promise<Order> => {
  authenticateUser({ admin: true }, context)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_ORDER,
    orderId: args._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_ORDER_PAYMENT,
    paymentId: args._paymentId,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const imageProofUrl = String(args._id).substr(String(args._id).length - 5)
  await handleDeleteImage('payments/' + imageProofUrl)

  await context.database.payments.findOneAndDelete({ _orderId: args._id })

  const order: any = await context.database.orders.findOneAndDelete({
    _id: args._id
  })
  return order
}
