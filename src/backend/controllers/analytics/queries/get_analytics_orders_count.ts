import { Context } from '../../../../types/setup/context'
import { AnalyticsOrdersCount, GetAnalyticsArgs } from '../../../../types/analytics'
import { Order } from '../../../../types/order'
import { AdminPermission } from '../../../_enums/adminPermission'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'
import { formatDate } from '../../../_utils/handleFormat/formatDate'

export default async (
  _root: undefined,
  args: GetAnalyticsArgs,
  context: Context
): Promise<AnalyticsOrdersCount[]> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.VIEW_ANALYTICS,
    context
  })

  const orders: Order[] = await context.database.orders
    .find(queryArgs(args))
    .toArray()

  const orderModifiedDates: string[] = orders.map((order: Order): string => {
    return formatDate(order.createdAt).slice(0, -5)
  })

  const analyticsOrdersCount: AnalyticsOrdersCount[] = []

  orderModifiedDates.forEach((date: string): void => {
    const dateAppended = analyticsOrdersCount.find((res) => res.date === date)

    if (dateAppended) {
      dateAppended.orders += 1
    } else {
      analyticsOrdersCount.push({ date, orders: 1 })
    }
  })

  return analyticsOrdersCount
}
