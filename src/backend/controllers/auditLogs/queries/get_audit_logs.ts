import { Context } from 'types/context'
import { AuditLog, GetAuditLogArgs } from 'types/auditLog'

export default async (
  _root: undefined,
  args: GetAuditLogArgs,
  context: Context
): Promise<AuditLog[]> => {
  const { action, orderId, paymentId, productId, productVariantId } = args

  const auditLogs: any = await context.database.auditLogs.find({
    action: action,
    orderId: orderId,
    paymentId: paymentId,
    productId: productId,
    productVariantId: productVariantId
  })

  return auditLogs
}
