import { Context } from '../../../../types/setup/context'
import { GetOrderArgs } from '../../../../types/order'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'
import { searchUser } from '../../../_utils/handleData/searchUser'
import { returnUserOrders } from '../../../_utils/handleData/returnUserOrders'

export default async (
  _root: undefined,
  args: GetOrderArgs,
  context: Context
): Promise<number> => {
  await authenticateUser({ admin: false, context })

  const modifiedArgs: GetOrderArgs | any = queryArgs(args)
  await searchUser(modifiedArgs, args.paginateData?.searchText, context)

  returnUserOrders(modifiedArgs, context)

  const count: any = await context.database.orders.countDocuments(modifiedArgs)

  return count
}
