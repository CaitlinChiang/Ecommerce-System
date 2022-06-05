import { Context } from '../../../../types/context'
import { Review, CreateReviewArgs } from '../../../../types/review'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: CreateReviewArgs,
  context: Context
): Promise<Review> => {
  authenticateUser({ admin: false }, context)

  const review: any = await context.database.reviews.insertOne({
    ...args,
    createdAt: new Date()
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_REVIEW,
    reviewId: review._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return review
}
