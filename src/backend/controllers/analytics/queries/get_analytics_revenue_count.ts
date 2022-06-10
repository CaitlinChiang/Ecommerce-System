import { Context } from '../../../../types/context'
import { AnalyticsRevenueCount, GetAnalyticsArgs } from '../../../../types/analytics'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: GetAnalyticsArgs,
  context: Context
): Promise<AnalyticsRevenueCount[]> => {
  authenticateUser({ admin: true }, context)

  const pipeline = [
    {
      $match: {
        createdAt: {
          $gte: args.startDate,
          $lte: args.endDate
        }
      }
    },
    {
      $dateToString: {
        date: '$createdAt',
        format: '%m-%d-%Y'
      }
    },
    {
      $group: {
        _id: { date: '$createdAt' },
        revenue: { $sum: '$amountDue' }
      }
    },
    {
      $project: {
        date: '$_id',
        revenue: '$revenue'
      }
    }
  ]

  const analyticsRevenueCount: any = await context.database.payments.aggregate(
    pipeline
  )
  return analyticsRevenueCount
}
