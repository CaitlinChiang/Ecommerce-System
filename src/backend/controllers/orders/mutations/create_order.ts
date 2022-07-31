import { Context } from '../../../../types/setup/context'
import { Order, CreateOrderArgs } from '../../../../types/order'
import { OrderStatus } from '../../../_enums/orderStatus'
import { StockQuantityAction } from '../../../_enums/stockQuantity'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { auditArgs } from '../../../_utils/handleArgs/auditArgs'
import { createPayment } from '../../payments/mutations/create_payment'
import { emptyCart } from '../../cart/mutations/empty_cart'
import { updateStockQuantity } from '../../../_utils/handleData/updateStockQuantity'

export default async (
  _root: undefined,
  args: CreateOrderArgs,
  context: Context
): Promise<Order> => {
  await authenticateUser({ admin: false, context })

  const { payment, ...remainingArgs } = args

  const order: any = await context.database.orders.insertOne({
    ...mutateArgs(remainingArgs, MutateAction.CREATE),
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

  await updateStockQuantity(StockQuantityAction.SUBTRACT, args.items, context)

  return order.insertedId
}
