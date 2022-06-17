import { Context } from '../../../../types/setup/context'
import { Review, GetReviewArgs } from '../../../../types/review'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'
import { sortArgs } from '../../../_utils/helpers/returnSortArgs'

export default async (
  _root: undefined,
  args: GetReviewArgs,
  context: Context
): Promise<Review[]> => {
  authenticateUser({ admin: false }, context)

  const reviews: any = await context.database.reviews
    .find(queryArgs(args))
    .sort(sortArgs(args?.paginateData))
    .skip(args?.paginateData?.offset)
    .limit(args?.paginateData?.rowsPerPage)
    .toArray()

  return reviews
}
