import { Context } from '../../../../types/setup/context'
import { AnalyticsOrdersCount, GetAnalyticsArgs } from '../../../../types/analytics'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { modifiedArgs } from '../../../_utils/helpers/returnModifiedArgs'

export default async (
  _root: undefined,
  args: GetAnalyticsArgs,
  context: Context
): Promise<AnalyticsOrdersCount[]> => {
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
