import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Review, UpdateReviewArgs } from '../../../../types/review'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutationArgs } from '../../../_utils/handleArgs/returnMutationArgs'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'

export default async (
  _root: undefined,
  args: UpdateReviewArgs,
  context: Context
): Promise<Review> => {
  authenticateUser({
    admin: true,
    permission: AdminPermission.UPDATE_REVIEW,
    context
  })

  const review: any = await context.database.reviews.findOneAndUpdate(
    { _id: new ObjectId(args._id) },
    { $set: mutationArgs(args, MutateAction.UPDATE) }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_REVIEW,
    reviewId: new ObjectId(review._id),
    ...auditArgs(context)
  })

  return review
}
