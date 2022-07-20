import { Context } from '../../../../types/setup/context'
import { Order, GetOrderArgs } from '../../../../types/order'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/returnQueryArgs'
import { sortArgs } from '../../../_utils/handleArgs/returnSortArgs'
import { searchUser } from '../../../_utils/handleData/searchUser'
import { returnOrdersUserId } from '../../../_utils/handleArgs/returnOrdersUserId'

export default async (
  _root: undefined,
  args: GetOrderArgs,
  context: Context
): Promise<Order[]> => {
  authenticateUser({ admin: false, context })

  const modifiedArgs: GetOrderArgs | any = queryArgs(args)
  await searchUser(modifiedArgs, args.paginateData?.searchText, context)

  returnOrdersUserId(modifiedArgs, context)

  const orders: Order[] = await context.database.orders
    .find(modifiedArgs)
    .sort(sortArgs(args?.paginateData))
    .skip(args?.paginateData?.page * args?.paginateData?.rowsPerPage || 0)
    .limit(args?.paginateData?.rowsPerPage || 200)
    .toArray()

  return orders
}
