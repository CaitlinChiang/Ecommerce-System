import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import {
  PaymentMethod,
  UpdatePaymentMethodArgs
} from '../../../../types/paymentMethod'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: UpdatePaymentMethodArgs,
  context: Context
): Promise<PaymentMethod> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.UPDATE_PAYMENT_METHOD,
    context
  })

  const paymentMethod: PaymentMethod = await context.database.paymentMethods
    .findOneAndUpdate(
      { _id: new ObjectId(args._id) },
      { $set: mutateArgs(args, MutateAction.UPDATE) },
      { returnDocument: 'after' }
    )
    .then((paymentMethod) => paymentMethod.value)

  await createAuditLog(AuditLogAction.UPDATE_PAYMENT_METHOD, context)

  return paymentMethod
}
