import { Context } from 'types/context'
import { GetAuditLogArgs } from 'types/auditLog'

export default async (
  _root: undefined,
  args: GetAuditLogArgs,
  context: Context
): Promise<number> => {
  const usersCount: number = await context.database.users.countDocuments({
    action: args?.action,
    orderId: args?.orderId,
    paymentId: args?.paymentId,
    productId: args?.productId,
    productVariantId: args?.productVariantId
  })
  return usersCount
}
