import { Context } from 'types/context'
import { Review, UpdateReviewArgs } from 'types/review'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: UpdateReviewArgs,
  context: Context
): Promise<Review> => {
  const { _id, featured } = args

  const updateReview: Partial<UpdateReviewArgs> = {
    featured: featured,
    updatedAt: new Date()
  }
  const review: any = await context.database.reviews.findOneAndUpdate({ _id: _id }, updateReview)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_REVIEW,
    reviewId: review._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return review
}
