import { Context } from '../../../../types/setup/context'
import {
  PaymentMethod,
  DeletePaymentMethodArgs
} from '../../../../types/paymentMethod'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: DeletePaymentMethodArgs,
  context: Context
): Promise<PaymentMethod> => {
  authenticateUser({ admin: true }, context)

  const paymentMethod: any = await context.database.paymentMethods.findOneAndDelete({
    _id: args._id
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_PAYMENT_METHOD,
    paymentMethodId: args._id,
    ...auditArgs(context)
  })

  return paymentMethod
}
