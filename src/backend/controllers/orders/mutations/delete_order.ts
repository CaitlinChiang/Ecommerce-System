import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Order, DeleteOrderArgs } from '../../../../types/order'
import { StockQuantityAction } from '../../../_enums/stockQuantity'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'
import { modifyStockQuantity } from '../../../_utils/handleData/modifyStockQuantity'
import { deletePayment } from '../../payments/mutations/delete_payment'

export default async (
  _root: undefined,
  args: DeleteOrderArgs,
  context: Context
): Promise<Order> => {
  authenticateUser({ admin: true, context })

  const order: Order = await context.database.orders.findOne({
    _id: new ObjectId(args._id)
  })

  await modifyStockQuantity(order.items, StockQuantityAction.ADD, context)

  await context.database.orders.findOneAndDelete({
    _id: new ObjectId(args._id)
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_ORDER,
    orderId: new ObjectId(args._id),
    ...auditArgs(context)
  })

  await deletePayment(args._id, context)

  return order
}
