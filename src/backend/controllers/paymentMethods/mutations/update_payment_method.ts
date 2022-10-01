import { Context } from '../../../../types/setup/context'
import {
  PaymentMethod,
  UpdatePaymentMethodArgs
} from '../../../../types/paymentMethod'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnUpdatedData } from '../../../_utils/handleData/returnUpdatedData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: UpdatePaymentMethodArgs,
  context: Context
): Promise<PaymentMethod> => {
  await authenticateUser(context, true, AdminPermission.UPDATE_PAYMENT_METHOD)

  const paymentMethod: PaymentMethod = await returnUpdatedData(
    context,
    args,
    'paymentMethods'
  )

  await createAuditLog(context, AuditLogAction.UPDATE_PAYMENT_METHOD)

  return paymentMethod
}
