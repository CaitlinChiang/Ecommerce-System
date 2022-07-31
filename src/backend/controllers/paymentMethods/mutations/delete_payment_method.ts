import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import {
  PaymentMethod,
  DeletePaymentMethodArgs
} from '../../../../types/paymentMethod'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { auditArgs } from '../../../_utils/handleArgs/auditArgs'

export default async (
  _root: undefined,
  args: DeletePaymentMethodArgs,
  context: Context
): Promise<PaymentMethod> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.DELETE_PAYMENT_METHOD,
    context
  })

  const paymentMethod: any = await context.database.paymentMethods.findOneAndDelete({
    _id: new ObjectId(args._id)
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_PAYMENT_METHOD,
    paymentMethodId: new ObjectId(args._id),
    ...auditArgs(context)
  })

  return paymentMethod.value
}
