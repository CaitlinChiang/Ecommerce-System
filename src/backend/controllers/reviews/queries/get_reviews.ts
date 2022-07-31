import { Context } from '../../../../types/setup/context'
import { Review, GetReviewArgs } from '../../../../types/review'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'
import { sort, skip, limit } from '../../../_utils/handleArgs/paginateArgs'

export default async (
  _root: undefined,
  args: GetReviewArgs,
  context: Context
): Promise<Review[]> => {
  await authenticateUser({ admin: false, context })

  const reviews: Review[] = await context.database.reviews
    .find(queryArgs(args))
    .sort(sort(args?.paginateData))
    .skip(skip(args?.paginateData))
    .limit(limit(args?.paginateData))
    .toArray()

  return reviews
}
