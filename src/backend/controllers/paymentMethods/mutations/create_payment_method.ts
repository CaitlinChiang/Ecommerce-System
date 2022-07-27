import { Context } from '../../../../types/setup/context'
import {
  PaymentMethod,
  CreatePaymentMethodArgs
} from '../../../../types/paymentMethod'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutationArgs } from '../../../_utils/handleArgs/returnMutationArgs'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'

export default async (
  _root: undefined,
  args: CreatePaymentMethodArgs,
  context: Context
): Promise<PaymentMethod> => {
  authenticateUser({
    admin: true,
    permission: AdminPermission.CREATE_PAYMENT_METHOD,
    context
  })

  const paymentMethod: any = await context.database.paymentMethods.insertOne(
    mutationArgs(args, MutateAction.CREATE)
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_PAYMENT_METHOD,
    paymentMethodId: paymentMethod.insertedId,
    ...auditArgs(context)
  })

  return paymentMethod
}
