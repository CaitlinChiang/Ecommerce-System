import { Context } from 'types/context'
import { Order } from 'types/order'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<Order[]> => {
  const orders: any = await context.database.orders.find({})
  
  return orders
}
