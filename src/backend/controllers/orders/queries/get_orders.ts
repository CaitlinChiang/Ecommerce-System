import { Context } from '../../../../types/setup/context'
import { Order, GetOrderArgs } from '../../../../types/order'
import { UserType } from '../../../../types/_enums/userType'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<Order[]> => {
  authenticateUser({ admin: false }, context)

  const modifiedArgs: GetOrderArgs = {
    ...queryArgs(args)
  }
  if (context.currentUserType == UserType.CONSUMER) {
    modifiedArgs.userId = context.currentUserId
  }

  const orders: any = await context.database.orders.find(modifiedArgs)
  return orders
}
