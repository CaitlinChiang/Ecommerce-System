import { Context } from 'types/context'
import { Order } from 'types/order'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  const ordersCount: number = await context.database.orders.countDocuments()
  
  return ordersCount
}
