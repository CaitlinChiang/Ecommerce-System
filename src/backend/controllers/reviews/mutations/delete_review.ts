import { Context } from 'types/context'
import { Review, DeleteReviewArgs } from 'types/review'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: DeleteReviewArgs,
  context: Context
): Promise<Review> => {
  const { _id } = args

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_REVIEW,
    reviewId: _id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const review: any = await context.database.reviews.findOneAndDelete({ _id: _id })
  
  return review
}
