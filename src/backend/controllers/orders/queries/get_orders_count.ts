import { Context } from '../../../../types/setup/context'
import { GetOrderArgs } from 'types/order'
import { UserType } from '../../../../types/_enums/userType'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { modifiedArgsWithDateFilter } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: false }, context)

  const modifiedArgs: GetOrderArgs = {
    ...modifiedArgsWithDateFilter(args)
  }
  if (context.currentUserType == UserType.CONSUMER) {
    modifiedArgs.userId = context.currentUserId
  }

  const ordersCount: number = await context.database.orders.countDocuments(
    modifiedArgs
  )
  return ordersCount
}
