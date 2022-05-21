import { Context } from 'types/context'
import { Order, GetOrderArgs } from 'types/order'

export default async (
  _root: undefined,
  args: GetOrderArgs,
  context: Context
): Promise<Order> => {
  const { _id } = args

  const order: Order = await context.database.orders.findOne({ _id: _id })

  return order
}
