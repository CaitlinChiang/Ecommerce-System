import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { CreateOrderArgs } from '../../../../types/order'
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
): Promise<void> => {
  await authenticateUser(context, false)

  const { payment, ...remainingArgs } = args

  const orderId: ObjectId = await context.database.orders
    .insertOne({
      ...mutateArgs(context, remainingArgs, MutateAction.CREATE),
      status: OrderStatus.PENDING,
      userId: context.userId
    })
    .then((order) => order.insertedId)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_ORDER,
    orderId,
    ...auditArgs(context.userId)
  })

  await createPayment(context, orderId, payment)

  await emptyCart(context)

  await updateStockQuantity(context, StockQuantityAction.SUBTRACT, args.items)
}
