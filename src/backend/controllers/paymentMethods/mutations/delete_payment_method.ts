import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { DeletePaymentMethodArgs } from '../../../../types/paymentMethod'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: DeletePaymentMethodArgs,
  context: Context
): Promise<void> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.DELETE_PAYMENT_METHOD,
    context
  })

  await context.database.paymentMethods.findOneAndDelete({
    _id: new ObjectId(args._id)
  })

  await createAuditLog(AuditLogAction.DELETE_PAYMENT_METHOD, context)
}
