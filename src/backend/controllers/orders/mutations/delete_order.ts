import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Order, DeleteOrderArgs } from '../../../../types/order'
import { AdminPermission } from '../../../_enums/adminPermission'
import { StockQuantityAction } from '../../../_enums/stockQuantity'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'
import { updateStockQuantity } from '../../../_utils/handleData/updateStockQuantity'
import { deletePayment } from '../../payments/mutations/delete_payment'

export default async (
  _root: undefined,
  args: DeleteOrderArgs,
  context: Context
): Promise<void> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.DELETE_ORDER,
    context
  })

  const order: Order = await context.database.orders
    .findOneAndDelete({ _id: new ObjectId(args._id) })
    .then((order) => order.value)

  await createAuditLog(AuditLogAction.DELETE_ORDER, context)

  await deletePayment(args._id, context)

  await updateStockQuantity(StockQuantityAction.ADD, order?.items, context)
}
