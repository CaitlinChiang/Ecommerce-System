import { Context } from '../../../../types/setup/context'
import { GetReviewArgs } from 'types/review'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: GetReviewArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: false }, context)

  const reviewsCount: any = await context.database.reviews.countDocuments(
    queryArgs(args)
  )

  return reviewsCount
}
