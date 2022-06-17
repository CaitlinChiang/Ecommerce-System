import { Context } from '../../../../types/setup/context'
import {
  PaymentMethod,
  UpdatePaymentMethodArgs
} from '../../../../types/paymentMethod'
import { MutateAction } from '../../../../types/_enumsBackend/mutateAction'
import { AuditLogAction } from '../../../../types/_enumsBackend/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: UpdatePaymentMethodArgs,
  context: Context
): Promise<PaymentMethod> => {
  authenticateUser({ admin: true }, context)

  const paymentMethod: any = await context.database.paymentMethods.findOneAndUpdate(
    { _id: args._id },
    mutationArgs(args, MutateAction.UPDATE)
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_PAYMENT_METHOD,
    paymentMethodId: paymentMethod._id,
    ...auditArgs(context)
  })

  return paymentMethod
}
