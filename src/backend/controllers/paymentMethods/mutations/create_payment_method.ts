import { Context } from '../../../../types/setup/context'
import {
  PaymentMethod,
  CreatePaymentMethodArgs
} from '../../../../types/paymentMethod'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: CreatePaymentMethodArgs,
  context: Context
): Promise<PaymentMethod> => {
  authenticateUser({ admin: true }, context)

  const paymentMethod: any = await context.database.paymentMethods.insertOne({
    ...args,
    createdAt: new Date()
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_PAYMENT_METHOD,
    paymentMethodId: paymentMethod._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return paymentMethod
}
