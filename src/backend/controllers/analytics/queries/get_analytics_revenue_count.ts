import { Context } from '../../../../types/setup/context'
import { AnalyticsRevenueCount, GetAnalyticsArgs } from '../../../../types/analytics'
import { Payment } from '../../../../types/payment'
import { AdminPermission } from '../../../_enums/adminPermission'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/returnQueryArgs'
import { formatDate } from '../../../_utils/handleDates/formatDate'

export default async (
  _root: undefined,
  args: GetAnalyticsArgs,
  context: Context
): Promise<AnalyticsRevenueCount[]> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.VIEW_ANALYTICS,
    context
  })

  const payments: Payment[] = await context.database.payments
    .find(queryArgs(args))
    .toArray()

  const paymentsModifiedDate = payments.map(
    (payment: Payment): { amountDue: number; createdAt: string } => {
      return {
        amountDue: payment.amountDue,
        createdAt: formatDate(payment.createdAt).slice(0, -5)
      }
    }
  )

  const analyticsRevenueCount: AnalyticsRevenueCount[] = []

  paymentsModifiedDate.forEach(
    (payment: { amountDue: number; createdAt: string }): void => {
      const exists = analyticsRevenueCount.find(
        (res) => res.date === payment.createdAt
      )

      if (exists) {
        exists.revenue += payment.amountDue
      } else {
        analyticsRevenueCount.push({
          date: payment.createdAt,
          revenue: payment.amountDue
        })
      }
    }
  )

  return analyticsRevenueCount
}
