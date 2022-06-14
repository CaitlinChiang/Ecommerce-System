import { Context } from '../../../../types/setup/context'
import { AnalyticsRevenueCount, GetAnalyticsArgs } from '../../../../types/analytics'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { modifiedArgs } from '../../../_utils/helpers/returnModifiedArgs'

export default async (
  _root: undefined,
  args: GetAnalyticsArgs,
  context: Context
): Promise<AnalyticsRevenueCount[]> => {
  authenticateUser({ admin: true }, context)

  const pipeline = [
    {
      $match: modifiedArgs(args)
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
