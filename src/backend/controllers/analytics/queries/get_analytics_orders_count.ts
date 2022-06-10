import { Context } from '../../../../types/context'
import { AnalyticsOrdersCount, GetAnalyticsArgs } from '../../../../types/analytics'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: GetAnalyticsArgs,
  context: Context
): Promise<AnalyticsOrdersCount[]> => {
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
        orders: { $sum: 1 }
      }
    },
    {
      $project: {
        date: '$_id',
        orders: '$orders'
      }
    }
  ]

  const analyticsOrdersCount: any = await context.database.orders.aggregate(pipeline)
  return analyticsOrdersCount
}
