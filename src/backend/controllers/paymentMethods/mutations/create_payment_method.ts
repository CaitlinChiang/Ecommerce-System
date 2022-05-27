import { Context } from 'types/context'
import { PaymentMethod, CreatePaymentMethodArgs } from 'types/paymentMethod'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: CreatePaymentMethodArgs,
  context: Context
): Promise<PaymentMethod> => {
  const { name, details } = args

  const createPaymentMethod: CreatePaymentMethodArgs = {
    name: name,
    details: details,
    createdAt: new Date()
  }
  const paymentMethod: any = await context.database.paymentMethods.insertOne(createPaymentMethod)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_PAYMENT_METHOD,
    paymentMethodId: paymentMethod._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return paymentMethod
}
