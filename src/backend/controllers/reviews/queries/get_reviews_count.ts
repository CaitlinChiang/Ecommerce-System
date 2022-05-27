import { Context } from 'types/context'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  const reviewsCount: number = await context.database.reviews.countDocuments()
  
  return reviewsCount
}
