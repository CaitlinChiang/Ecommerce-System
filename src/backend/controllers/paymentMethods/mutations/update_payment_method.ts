import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import {
  PaymentMethod,
  UpdatePaymentMethodArgs
} from '../../../../types/paymentMethod'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutationArgs } from '../../../_utils/handleArgs/returnMutationArgs'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'

export default async (
  _root: undefined,
  args: UpdatePaymentMethodArgs,
  context: Context
): Promise<PaymentMethod> => {
  authenticateUser({ admin: true }, context)

  const paymentMethod: any = await context.database.paymentMethods.findOneAndUpdate(
    { _id: new ObjectId(args._id) },
    { $set: mutationArgs(args, MutateAction.UPDATE) }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PAYMENT_METHOD,
    paymentMethodId: new ObjectId(paymentMethod._id),
    ...auditArgs(context)
  })

  return paymentMethod
}
