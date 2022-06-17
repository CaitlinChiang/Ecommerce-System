import { Context } from '../../../../types/setup/context'
import { GetOrderArgs } from 'types/order'
import { UserType } from '../../../_enums/userType'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: GetOrderArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: false }, context)

  const modifiedArgs: GetOrderArgs = {
    ...queryArgs(args)
  }
  if (context.currentUserType == UserType.CONSUMER) {
    modifiedArgs.userId = context.currentUserId
  }

  const ordersCount: any = await context.database.orders.countDocuments(modifiedArgs)

  return ordersCount
}
