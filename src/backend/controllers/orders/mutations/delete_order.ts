import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Order, DeleteOrderArgs } from '../../../../types/order'
import { AdminPermission } from '../../../_enums/adminPermission'
import { StockQuantityAction } from '../../../_enums/stockQuantity'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { auditArgs } from '../../../_utils/handleArgs/auditArgs'
import { updateStockQuantity } from '../../../_utils/handleData/updateStockQuantity'
import { deletePayment } from '../../payments/mutations/delete_payment'

export default async (
  _root: undefined,
  args: DeleteOrderArgs,
  context: Context
): Promise<Order> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.DELETE_ORDER,
    context
  })

  const order: any = await context.database.orders.findOneAndDelete({
    _id: new ObjectId(args._id)
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_ORDER,
    orderId: new ObjectId(args._id),
    ...auditArgs(context)
  })

  await deletePayment(args._id, context)

  await updateStockQuantity(StockQuantityAction.ADD, order?.value?.items, context)

  return order.value
}
