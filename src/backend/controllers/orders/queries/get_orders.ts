import { Context } from '../../../../types/context'
import { Order, GetOrderArgs } from '../../../../types/order'
import { UserType } from 'types/_enums/userType'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<Order[]> => {
  authenticateUser({ admin: false }, context)

  const modifiedArgs: GetOrderArgs = {}
  if (context.currentUserType == UserType.ADMIN) {
    modifiedArgs.userId = context.currentUserId
  }

  const orders: any = await context.database.orders.find(modifiedArgs)
  return orders
}
