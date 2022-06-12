import { Context } from '../../../../types/setup/context'
import { Review, DeleteReviewArgs } from '../../../../types/review'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: DeleteReviewArgs,
  context: Context
): Promise<Review> => {
  authenticateUser({ admin: true }, context)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_REVIEW,
    reviewId: args._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const review: any = await context.database.reviews.findOneAndDelete({
    _id: args._id
  })
  return review
}
