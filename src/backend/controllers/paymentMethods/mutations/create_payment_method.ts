import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import {
  PaymentMethod,
  CreatePaymentMethodArgs
} from '../../../../types/paymentMethod'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: CreatePaymentMethodArgs,
  context: Context
): Promise<PaymentMethod> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.CREATE_PAYMENT_METHOD,
    context
  })

  const paymentMethodId: ObjectId = await context.database.paymentMethods
    .insertOne(mutateArgs(args, MutateAction.CREATE))
    .then((paymentMethod) => paymentMethod.insertedId)

  await createAuditLog(AuditLogAction.CREATE_PAYMENT_METHOD, context)

  return { _id: paymentMethodId, ...args }
}
