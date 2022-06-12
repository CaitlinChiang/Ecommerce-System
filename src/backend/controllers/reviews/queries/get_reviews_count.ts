import { Context } from '../../../../types/setup/context'
import { GetReviewArgs } from 'types/review'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: GetReviewArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: false }, context)

  const reviewsCount: number = await context.database.reviews.countDocuments(args)
  return reviewsCount
}
