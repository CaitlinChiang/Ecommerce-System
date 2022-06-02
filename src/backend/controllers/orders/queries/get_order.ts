import { Context } from 'types/context'
import { Order, GetOrderArgs } from 'types/order'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (_root: undefined, args: GetOrderArgs, context: Context): Promise<Order> => {
  authenticateUser({ admin: true }, context)

  const order: Order = await context.database.orders.findOne({ _id: args._id })
  return order
}
