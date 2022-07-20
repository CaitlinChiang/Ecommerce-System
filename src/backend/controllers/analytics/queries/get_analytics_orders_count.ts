import { Context } from '../../../../types/setup/context'
import { AnalyticsOrdersCount, GetAnalyticsArgs } from '../../../../types/analytics'
import { Order } from '../../../../types/order'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/returnQueryArgs'
import { formatDate } from '../../../_utils/handleDates/formatDate'

export default async (
  _root: undefined,
  args: GetAnalyticsArgs,
  context: Context
): Promise<AnalyticsOrdersCount[]> => {
  authenticateUser({ admin: true, context })

  const orders: Order[] = await context.database.orders
    .find(queryArgs(args))
    .toArray()

  const ordersModifiedDate = orders.map((order: Order): string => {
    return formatDate(order.createdAt).slice(0, -5)
  })

  const analyticsOrdersCount: AnalyticsOrdersCount[] = []

  ordersModifiedDate.forEach((orderDate: string): void => {
    const exists = analyticsOrdersCount.find((res) => res.date === orderDate)

    if (exists) {
      exists.orders += 1
    } else {
      analyticsOrdersCount.push({ date: orderDate, orders: 1 })
    }
  })

  return analyticsOrdersCount
}
