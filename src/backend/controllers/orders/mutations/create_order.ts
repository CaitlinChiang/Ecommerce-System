import { Context } from 'types/context'
import { Order, CreateOrderArgs } from 'types/order'
import { OrderStatus } from 'types/_enums/orderStatus'
import { CreatePaymentArgs } from 'types/payment'
import { PaymentStatus } from 'types/_enums/paymentStatus'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: CreateOrderArgs,
  context: Context
): Promise<Order> => {
  const createOrder: CreateOrderArgs = {
    collectionMethod: args?.collectionMethod,
    deliveryAddress: args?.deliveryAddress,
    productIds: args?.productIds,
    productVariantIds: args?.productVariantIds,
    status: OrderStatus.PENDING,
    userId: context.currentUserId,
    createdAt: new Date()
  }

  const order: any = await context.database.orders.insertOne(createOrder)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_ORDER,
    orderId: order._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const createPayment: Partial<CreatePaymentArgs> = {
    _orderId: order._id,
    amountDue: args?.payment.amountDue,
    method: args?.payment.method,
    status: PaymentStatus.COMPLETE,
    createdAt: new Date()
  }

  await context.database.payments.insertOne(createPayment)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_ORDER_PAYMENT,
    paymentId: order._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return order
}
