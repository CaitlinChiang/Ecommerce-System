import { Context } from '../../../../types/context'
import { PaymentMethod, DeletePaymentMethodArgs } from '../../../../types/paymentMethod'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: DeletePaymentMethodArgs,
  context: Context
): Promise<PaymentMethod> => {
  authenticateUser({ admin: true }, context)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_PAYMENT_METHOD,
    paymentMethodId: args._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const paymentMethod: any = await context.database.paymentMethods.findOneAndDelete({
    _id: args._id
  })
  return paymentMethod
}
