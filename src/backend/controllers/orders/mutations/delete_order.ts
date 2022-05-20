import { Context } from 'types/context'
import { Order, DeleteOrderArgs } from 'types/order'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: DeleteOrderArgs,
  context: Context
): Promise<Order> => {
  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_ORDER,
    orderId: args._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const order: any = await context.database.orders.findOneAndDelete({ _id: args._id })
  return order
}