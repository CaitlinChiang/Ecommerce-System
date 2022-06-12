import { Context } from '../../../../types/_setup/context'
import { GetOrderArgs } from 'types/order'
import { UserType } from '../../../../types/_enums/userType'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { modifiedArgsWithDateFilter } from '../../../_utils/helpers/filterDateRange'

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
