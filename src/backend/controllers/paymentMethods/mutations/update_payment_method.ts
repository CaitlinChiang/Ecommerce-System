import { Context } from 'types/context'
import { PaymentMethod, UpdatePaymentMethodArgs } from 'types/paymentMethod'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (_root: undefined, args: UpdatePaymentMethodArgs, context: Context): Promise<PaymentMethod> => {
  authenticateUser({ admin: true }, context)

  const paymentMethod: any = await context.database.paymentMethods.findOneAndUpdate(
    { _id: args._id },
    { ...args, updatedAt: new Date() }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PAYMENT_METHOD,
    paymentMethodId: paymentMethod._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return paymentMethod
}
