import { Context } from 'types/context'
import { Order, UpdateOrderArgs } from 'types/order'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: UpdateOrderArgs,
  context: Context
): Promise<Order> => {
  const updateOrder: Partial<UpdateOrderArgs> = {
    collectionMethod: args.collectionMethod,
    status: args.status,
    updatedAt: new Date()
  }

  const order: any = await context.database.orders.findOneAndUpdate({ _id: args._id }, updateOrder)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_ORDER,
    orderId: order._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return order
}
