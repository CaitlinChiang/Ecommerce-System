import { Context } from '../../../../types/setup/context'
import { CreatePaymentMethodArgs } from '../../../../types/paymentMethod'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { createData } from '../../../_utils/handleData/createData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: CreatePaymentMethodArgs,
  context: Context
): Promise<void> => {
  await authenticateUser(context, true, AdminPermission.CREATE_PAYMENT_METHOD)

  await createData(context, args, 'paymentMethods')

  await createAuditLog(context, AuditLogAction.CREATE_PAYMENT_METHOD)
}
