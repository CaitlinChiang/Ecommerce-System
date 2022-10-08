import { Context } from '../../../../types/setup/context'
import { Order, GetOrderArgs } from '../../../../types/order'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'
import { searchUser } from '../../../_utils/handleData/searchUser'
import { returnUserOrders } from '../../../_utils/handleData/returnUserOrders'
import { returnDataArray } from '../../../_utils/handleData/returnDataArray'

export default async (
  _root: undefined,
  args: GetOrderArgs,
  context: Context
): Promise<Order[]> => {
  await authenticateUser(context, false)

  const modifiedArgs: GetOrderArgs | any = queryArgs(args)
  await searchUser(context, modifiedArgs, args.paginateData?.searchText)

  returnUserOrders(context, args)

  const orders: Order[] = await returnDataArray(context, args, 'orders')
  return orders
}
