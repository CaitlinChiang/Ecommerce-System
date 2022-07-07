import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Order, GetOrderArgs } from '../../../../types/order'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

export default async (
  _root: undefined,
  args: GetOrderArgs,
  context: Context
): Promise<Order> => {
  authenticateUser({ admin: true }, context)

  const order: Order = await context.database.orders.findOne({
    _id: new ObjectId(args._id)
  })

  return order
}
