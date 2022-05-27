import { Context } from 'types/context'
import { Review, CreateReviewArgs } from 'types/review'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: CreateReviewArgs,
  context: Context
): Promise<Review> => {
  const { content, username } = args

  const createReview: CreateReviewArgs = {
    content: content,
    featured: false,
    username: username,
    createdAt: new Date()
  }
  const review: any = await context.database.reviews.insertOne(createReview)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_REVIEW,
    reviewId: review._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return review
}
