import { Context } from '../../../../types/context'
import { Order } from '../../../../types/order'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<Order[]> => {
  authenticateUser({ admin: false }, context)

  const orders: any = await context.database.orders.find({
    userId: context.currentUserId
  })
  return orders
}
