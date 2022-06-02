import { Context } from 'types/context'
import { Review } from 'types/review'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (_root: undefined, args: undefined, context: Context): Promise<Review[]> => {
  authenticateUser({ admin: false }, context)

  const reviews: any = await context.database.reviews.find({})
  return reviews
}
