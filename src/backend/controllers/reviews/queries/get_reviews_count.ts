import { Context } from 'types/context'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: false }, context)

  const reviewsCount: number = await context.database.reviews.countDocuments()
  return reviewsCount
}
