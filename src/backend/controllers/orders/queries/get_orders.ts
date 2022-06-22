import { Context } from '../../../../types/setup/context'
import { Order, GetOrderArgs } from '../../../../types/order'
import { UserType } from '../../../_enums/userType'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'
import { sortArgs } from '../../../_utils/helpers/returnSortArgs'

export default async (
  _root: undefined,
  args: GetOrderArgs,
  context: Context
): Promise<Order[]> => {
  authenticateUser({ admin: false }, context)

  const modifiedArgs: GetOrderArgs = {
    ...queryArgs(args)
  }
  if (context.currentUserType == UserType.CONSUMER) {
    modifiedArgs.userId = context.currentUserId
  }

  const orders: Order[] = await context.database.orders
    .find(modifiedArgs)
    .sort(sortArgs(args?.paginateData))
    .skip(args?.paginateData?.page * args?.paginateData?.rowsPerPage || 0)
    .limit(args?.paginateData?.rowsPerPage || 200)
    .toArray()

  return orders
}
