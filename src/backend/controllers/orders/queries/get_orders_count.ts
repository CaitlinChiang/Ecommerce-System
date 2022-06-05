import { Context } from '../../../../types/context'
import { GetOrderArgs } from 'types/order'
import { UserType } from 'types/_enums/userType'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: false }, context)

  const modifiedArgs: GetOrderArgs = {}
  if (context.currentUserType == UserType.ADMIN) {
    modifiedArgs.userId = context.currentUserId
  }

  const ordersCount: number = await context.database.orders.countDocuments(
    modifiedArgs
  )
  return ordersCount
}
