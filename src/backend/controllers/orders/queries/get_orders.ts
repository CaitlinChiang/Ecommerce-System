import { Context } from '../../../../types/setup/context'
import { Order, GetOrderArgs } from '../../../../types/order'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'
import { returnOrdersUserId } from '../../../_utils/helpers/returnOrdersUserId'
import { sortArgs } from '../../../_utils/helpers/returnSortArgs'

export default async (
  _root: undefined,
  args: GetOrderArgs,
  context: Context
): Promise<Order[]> => {
  authenticateUser({ admin: false }, context)

  const modifiedArgs: GetOrderArgs = queryArgs(args)
  returnOrdersUserId(modifiedArgs, context)

  const orders: Order[] = await context.database.orders
    .find(modifiedArgs)
    .sort(sortArgs(args?.paginateData))
    .skip(args?.paginateData?.page * args?.paginateData?.rowsPerPage || 0)
    .limit(args?.paginateData?.rowsPerPage || 200)
    .toArray()

  return orders
}
