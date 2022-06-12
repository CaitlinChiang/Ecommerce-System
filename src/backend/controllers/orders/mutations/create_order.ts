import { Context } from '../../../../types/_setup/context'
import { Order, CreateOrderArgs } from '../../../../types/order'
import { OrderStatus } from '../../../../types/_enums/orderStatus'
import { PaymentStatus } from '../../../../types/_enums/paymentStatus'
import { UploadImageType } from '../../../../types/_enums/uploadImageType'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { handleUploadImage } from '../../../_utils/handleImages/uploadImage'

export default async (
  _root: undefined,
  args: CreateOrderArgs,
  context: Context
): Promise<Order> => {
  authenticateUser({ admin: false }, context)

  const {
    payment: { imageProof, ...modifiedPaymentArgs },
    ...modifiedArgs
  } = args

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

  const imageProofUrl = await handleUploadImage({
    imageType: UploadImageType.PAYMENT,
    image: imageProof,
    orderId: String(order._id)
  })

  await context.database.payments.insertOne({
    _orderId: order._id,
    ...modifiedPaymentArgs,
    imageProofUrl,
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
