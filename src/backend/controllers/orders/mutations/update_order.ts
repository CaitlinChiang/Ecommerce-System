import { Context } from '../../../../types/setup/context'
import { Order, UpdateOrderArgs } from '../../../../types/order'
import { MutateAction } from '../../../../types/_enumsBackend/mutateAction'
import { AuditLogAction } from '../../../../types/_enumsBackend/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: UpdateOrderArgs,
  context: Context
): Promise<Order> => {
  authenticateUser({ admin: true }, context)

  const order: any = await context.database.orders.findOneAndUpdate(
    { _id: args._id },
    mutationArgs(args, MutateAction.UPDATE)
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_ORDER,
    orderId: order._id,
    ...auditArgs(context)
  })

  return order
}
