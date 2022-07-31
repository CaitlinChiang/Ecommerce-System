import { Context } from '../../../../types/setup/context'
import { Order, GetOrderArgs } from '../../../../types/order'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'
import { searchUser } from '../../../_utils/handleData/searchUser'
import { returnOrdersUserId } from '../../../_utils/handleArgs/returnOrdersUserId'
import { sort, skip, limit } from '../../../_utils/handleArgs/paginateArgs'

export default async (
  _root: undefined,
  args: GetOrderArgs,
  context: Context
): Promise<Order[]> => {
  await authenticateUser({ admin: false, context })

  const modifiedArgs: GetOrderArgs | any = queryArgs(args)
  await searchUser(modifiedArgs, args.paginateData?.searchText, context)

  returnOrdersUserId(modifiedArgs, context)

  const orders: Order[] = await context.database.orders
    .find(queryArgs(modifiedArgs))
    .sort(sort(args?.paginateData))
    .skip(skip(args?.paginateData))
    .limit(limit(args?.paginateData))
    .toArray()

  return orders
}
