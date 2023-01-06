import { Context } from '../../../../types/setup/context'
import { AnalyticsRevenueCount, GetAnalyticsArgs } from '../../../../types/analytics'
import { Payment } from '../../../../types/payment'
import { AdminPermission } from '../../../_enums/adminPermission'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'
import { formatDate } from '../../../_utils/handleFormats/formatDate'

export default async (
  _root: undefined,
  args: GetAnalyticsArgs,
  context: Context
): Promise<AnalyticsRevenueCount[]> => {
  await authenticateUser(context, true, AdminPermission.VIEW_ANALYTICS)

  const payments: Payment[] = await context.database.payments
    .find(queryArgs(args))
    .toArray()

  const paymentFormattedDates = payments.map(
    (payment: Payment): { date: string; revenue: number } => {
      return {
        date: formatDate(payment.createdAt).slice(0, -5),
        revenue: payment.amountDue
      }
    }
  )

  const analyticsRevenueCount: AnalyticsRevenueCount[] = []

  paymentFormattedDates.forEach(
    (payment: { date: string; revenue: number }): void => {
      const { date, revenue } = payment

      const dateAppended = analyticsRevenueCount.find((res) => res.date === date)

      if (dateAppended) {
        dateAppended.revenue += revenue
      } else {
        analyticsRevenueCount.push({ date, revenue })
      }
    }
  )

  return analyticsRevenueCount
}
