import { Context } from '../../../../types/setup/context'
import { Review, GetReviewArgs } from '../../../../types/review'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: GetReviewArgs,
  context: Context
): Promise<Review[]> => {
  authenticateUser({ admin: false }, context)

  const reviews: any = await context.database.reviews.find(queryArgs(args))
  return reviews
}
