import { Context } from '../../../../types/setup/context'
import { Review, DeleteReviewArgs } from '../../../../types/review'
import { AuditLogAction } from '../../../../types/_enumsBackend/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: DeleteReviewArgs,
  context: Context
): Promise<Review> => {
  authenticateUser({ admin: true }, context)

  const review: any = await context.database.reviews.findOneAndDelete({
    _id: args._id
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_REVIEW,
    reviewId: args._id,
    ...auditArgs(context)
  })

  return review
}
