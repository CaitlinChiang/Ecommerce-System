import { Context } from '../../../../types/setup/context'
import { GetOrderArgs } from '../../../../types/order'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'
import { searchUser } from '../../../_utils/helpers/searchUser'
import { returnOrdersUserId } from '../../../_utils/helpers/returnOrdersUserId'

export default async (
  _root: undefined,
  args: GetOrderArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: false }, context)

  const modifiedArgs: GetOrderArgs | any = queryArgs(args)
  await searchUser(args.paginateData?.searchText, modifiedArgs, context)

  returnOrdersUserId(modifiedArgs, context)

  const ordersCount: any = await context.database.orders.countDocuments(modifiedArgs)

  return ordersCount
}
