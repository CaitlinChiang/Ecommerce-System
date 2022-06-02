import { Context } from 'types/context'
import { Order, UpdateOrderArgs } from 'types/order'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (_root: undefined, args: UpdateOrderArgs, context: Context): Promise<Order> => {
  authenticateUser({ admin: true }, context)

  const order: any = await context.database.orders.findOneAndUpdate(
    { _id: args._id },
    { ...args, updatedAt: new Date() }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_ORDER,
    orderId: order._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return order
}
