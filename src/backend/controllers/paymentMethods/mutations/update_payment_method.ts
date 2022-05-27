import { Context } from 'types/context'
import { PaymentMethod, UpdatePaymentMethodArgs } from 'types/paymentMethod'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: UpdatePaymentMethodArgs,
  context: Context
): Promise<PaymentMethod> => {
  const { _id, name, details } = args

  const updatePaymentMethod: Partial<UpdatePaymentMethodArgs> = {
    name: name,
    details: details,
    updatedAt: new Date()
  }
  const paymentMethod: any = await context.database.paymentMethods.findOneAndUpdate({ _id: _id }, updatePaymentMethod)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PAYMENT_METHOD,
    paymentMethodId: paymentMethod._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return paymentMethod
}
