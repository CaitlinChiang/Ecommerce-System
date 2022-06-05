import { Context } from '../../../../types/context'
import { Payment, UpdatePaymentArgs } from '../../../../types/payment'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: UpdatePaymentArgs,
  context: Context
): Promise<Payment> => {
  authenticateUser({ admin: true }, context)

  const payment: any = await context.database.payments.findOneAndUpdate(
    { _orderId: args._orderId },
    { ...args, updatedAt: new Date() }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_ORDER_PAYMENT,
    paymentId: payment._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return payment
}
