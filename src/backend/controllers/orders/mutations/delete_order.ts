import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Order, DeleteOrderArgs } from '../../../../types/order'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { deletePayment } from '../../payments/mutations/delete_payment'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: DeleteOrderArgs,
  context: Context
): Promise<Order> => {
  authenticateUser({ admin: true }, context)

  const order: any = await context.database.orders.findOneAndDelete({
    _id: new ObjectId(args._id)
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_ORDER,
    orderId: new ObjectId(args._id),
    ...auditArgs(context)
  })

  await deletePayment(context, args._id)

  return order
}
