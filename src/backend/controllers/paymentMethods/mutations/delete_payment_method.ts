import { Context } from 'types/context'
import { PaymentMethod, DeletePaymentMethodArgs } from 'types/paymentMethod'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: DeletePaymentMethodArgs,
  context: Context
): Promise<PaymentMethod> => {
  const { _id } = args

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_PAYMENT_METHOD,
    paymentMethodId: _id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const paymentMethod: any = await context.database.paymentMethods.findOneAndDelete({ _id: _id })
  
  return paymentMethod
}
