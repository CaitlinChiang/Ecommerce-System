import { Context } from 'types/context'
import { AuditLog, GetAuditLogArgs } from 'types/auditLog'

export default async (
  _root: undefined,
  args: GetAuditLogArgs,
  context: Context
): Promise<AuditLog[]> => {
  const users: any = await context.database.auditLogs.find({
    action: args?.action,
    orderId: args?.orderId,
    paymentId: args?.paymentId,
    productId: args?.productId,
    productVariantId: args?.productVariantId
  })
  return users
}
