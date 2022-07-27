import { Context } from '../../../../types/setup/context'
import { GetOrderArgs } from '../../../../types/order'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/returnQueryArgs'
import { searchUser } from '../../../_utils/handleData/searchUser'
import { returnOrdersUserId } from '../../../_utils/handleArgs/returnOrdersUserId'

export default async (
  _root: undefined,
  args: GetOrderArgs,
  context: Context
): Promise<number> => {
  await authenticateUser({ admin: false, context })

  const modifiedArgs: GetOrderArgs | any = queryArgs(args)
  await searchUser(modifiedArgs, args.paginateData?.searchText, context)

  returnOrdersUserId(modifiedArgs, context)

  const ordersCount: any = await context.database.orders.countDocuments(modifiedArgs)

  return ordersCount
}
