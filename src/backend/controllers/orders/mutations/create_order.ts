import { Context } from '../../../../types/context'
import { Order, CreateOrderArgs } from '../../../../types/order'
import { OrderStatus } from '../../../../types/_enums/orderStatus'
import { PaymentStatus } from '../../../../types/_enums/paymentStatus'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: CreateOrderArgs,
  context: Context
): Promise<Order> => {
  authenticateUser({ admin: false }, context)

  const { payment, ...modifiedArgs } = args

  const order: any = await context.database.orders.insertOne({
    ...modifiedArgs,
    status: OrderStatus.PENDING,
    userId: context.currentUserId,
    createdAt: new Date()
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_ORDER,
    orderId: order._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  await context.database.payments.insertOne({
    _orderId: order._id,
    amountDue: payment?.amountDue,
    method: payment?.method,
    status: PaymentStatus.COMPLETE,
    createdAt: new Date()
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_ORDER_PAYMENT,
    paymentId: order._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return order
}
