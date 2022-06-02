import { Context } from 'types/context'
import { Review, UpdateReviewArgs } from 'types/review'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (_root: undefined, args: UpdateReviewArgs, context: Context): Promise<Review> => {
  authenticateUser({ admin: true }, context)

  const review: any = await context.database.reviews.findOneAndUpdate(
    { _id: args._id },
    { ...args, updatedAt: new Date() }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_REVIEW,
    reviewId: review._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return review
}
