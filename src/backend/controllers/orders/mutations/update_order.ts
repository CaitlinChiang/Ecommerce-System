import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Order, UpdateOrderArgs } from '../../../../types/order'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutationArgs } from '../../../_utils/handleArgs/returnMutationArgs'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'

export default async (
  _root: undefined,
  args: UpdateOrderArgs,
  context: Context
): Promise<Order> => {
  authenticateUser({ admin: true, context })

  const order: any = await context.database.orders.findOneAndUpdate(
    { _id: new ObjectId(args._id) },
    { $set: mutationArgs(args, MutateAction.UPDATE) }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_ORDER,
    orderId: new ObjectId(order._id),
    ...auditArgs(context)
  })

  return order
}
