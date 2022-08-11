import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import {
  PaymentMethod,
  DeletePaymentMethodArgs
} from '../../../../types/paymentMethod'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

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

  const paymentMethod: PaymentMethod = await context.database.paymentMethods
    .findOneAndDelete({ _id: new ObjectId(args._id) })
    .then((paymentMethod) => paymentMethod.value)

  await createAuditLog(AuditLogAction.DELETE_PAYMENT_METHOD, context)

  return paymentMethod
}
