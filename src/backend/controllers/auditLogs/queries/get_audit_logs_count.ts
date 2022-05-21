import { Context } from 'types/context'
import { GetAuditLogArgs } from 'types/auditLog'

export default async (
  _root: undefined,
  args: GetAuditLogArgs,
  context: Context
): Promise<number> => {
  const { action, orderId, paymentId, productId, productVariantId } = args
  
  const auditLogsCount: number = await context.database.auditLogs.countDocuments({
    action: action,
    orderId: orderId,
    paymentId: paymentId,
    productId: productId,
    productVariantId: productVariantId
  })
  
  return auditLogsCount
}
