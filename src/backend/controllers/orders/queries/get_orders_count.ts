import { Context } from '../../../../types/setup/context'
import { GetOrderArgs } from '../../../../types/order'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'
import { searchUser } from '../../../_utils/handleData/searchUser'
import { returnUserOrders } from '../../../_utils/handleData/returnUserOrders'
import { returnDataCount } from '../../../_utils/handleData/returnDataCount'

export default async (
  _root: undefined,
  args: GetOrderArgs,
  context: Context
): Promise<number> => {
  await authenticateUser(context, false)

  const modifiedArgs: GetOrderArgs | any = queryArgs(args)
  await searchUser(context, modifiedArgs, args.paginateData?.searchText)

  returnUserOrders(context, args)

  const count: number = await returnDataCount(context, args, 'orders')
  return count
}
