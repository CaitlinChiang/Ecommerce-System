import { Context } from 'types/context'
import { Payment, UpdatePaymentArgs } from 'types/payment'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: UpdatePaymentArgs,
  context: Context
): Promise<Payment> => {
  const { _orderId, status } = args

  const updatePayment: Partial<UpdatePaymentArgs> = {
    status: status,
    updatedAt: new Date()
  }
  const payment: any = await context.database.payments.findOneAndUpdate({ _orderId: _orderId }, updatePayment)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_ORDER_PAYMENT,
    paymentId: payment._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return payment
}
