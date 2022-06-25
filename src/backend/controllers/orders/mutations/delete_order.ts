import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Order, DeleteOrderArgs } from '../../../../types/order'
import { StockQuantityAction } from '../../../_enums/stockQuantityAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { deletePayment } from '../../payments/mutations/delete_payment'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'
import { modifyStockQuantity } from '../../../_utils/helpers/modifyStockQuantity'

export default async (
  _root: undefined,
  args: DeleteOrderArgs,
  context: Context
): Promise<Order> => {
  authenticateUser({ admin: true }, context)

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
