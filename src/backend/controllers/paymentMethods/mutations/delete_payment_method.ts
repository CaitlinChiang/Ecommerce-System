import { Context } from '../../../../types/setup/context'
import { DeletePaymentMethodArgs } from '../../../../types/paymentMethod'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { deleteData } from '../../../_utils/handleData/deleteData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: DeletePaymentMethodArgs,
  context: Context
): Promise<void> => {
  await authenticateUser(context, true, AdminPermission.DELETE_PAYMENT_METHOD)

  await deleteData(context, args, 'paymentMethods')

  await createAuditLog(context, AuditLogAction.DELETE_PAYMENT_METHOD)
}
