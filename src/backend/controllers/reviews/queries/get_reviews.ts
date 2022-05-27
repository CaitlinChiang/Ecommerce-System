import { Context } from 'types/context'
import { Review } from 'types/review'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<Review[]> => {
  const reviews: any = await context.database.reviews.find({})
  
  return reviews
}
