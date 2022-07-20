import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Review, DeleteReviewArgs } from '../../../../types/review'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'

export default async (
  _root: undefined,
  args: DeleteReviewArgs,
  context: Context
): Promise<Review> => {
  authenticateUser({ admin: true, context })

  const review: any = await context.database.reviews.findOneAndDelete({
    _id: new ObjectId(args._id)
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_REVIEW,
    reviewId: new ObjectId(args._id),
    ...auditArgs(context)
  })

  return review
}
