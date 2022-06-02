import { Context } from 'types/context'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: false }, context)

  const ordersCount: number = await context.database.orders.countDocuments({ userId: context.currentUserId })
  return ordersCount
}
