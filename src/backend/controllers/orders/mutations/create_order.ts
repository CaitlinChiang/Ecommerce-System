import { Context } from '../../../../types/setup/context'
import { Order, CreateOrderArgs } from '../../../../types/order'
import { OrderStatus } from '../../../../types/_enumsBackend/orderStatus'
import { MutateAction } from '../../../../types/_enumsBackend/mutateAction'
import { AuditLogAction } from '../../../../types/_enumsBackend/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'
import { createPayment } from '../../payments/mutations/create_payment'

export default async (
  _root: undefined,
  args: CreateOrderArgs,
  context: Context
): Promise<Order> => {
  authenticateUser({ admin: false }, context)

  const { payment, ...remainingArgs } = args

  const order: any = await context.database.orders.insertOne({
    ...mutationArgs(remainingArgs, MutateAction.CREATE),
    status: OrderStatus.PENDING,
    userId: context.currentUserId
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_ORDER,
    orderId: order._id,
    ...auditArgs(context)
  })

  await createPayment(context, order._id, payment)

  return order
}
