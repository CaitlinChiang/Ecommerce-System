import { Context } from '../../../../types/setup/context'
import { Order, CreateOrderArgs } from '../../../../types/order'
import { OrderStatus } from '../../../_enums/orderStatus'
import { StockQuantityAction } from '../../../_enums/stockQuantity'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutationArgs } from '../../../_utils/handleArgs/returnMutationArgs'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'
import { modifyStockQuantity } from '../../../_utils/handleData/modifyStockQuantity'
import { createPayment } from '../../payments/mutations/create_payment'
import { emptyCart } from '../../cart/mutations/empty_cart'

export default async (
  _root: undefined,
  args: CreateOrderArgs,
  context: Context
): Promise<Order> => {
  await authenticateUser({ admin: false, context })

  const { payment, ...remainingArgs } = args

  const order: any = await context.database.orders.insertOne({
    ...mutationArgs(remainingArgs, MutateAction.CREATE),
    status: OrderStatus.PENDING,
    userId: context.currentUserId
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_ORDER,
    orderId: order.insertedId,
    ...auditArgs(context)
  })

  await createPayment(order.insertedId, payment, context)

  await emptyCart(context)

  await modifyStockQuantity(args.items, StockQuantityAction.SUBTRACT, context)

  return order
}
