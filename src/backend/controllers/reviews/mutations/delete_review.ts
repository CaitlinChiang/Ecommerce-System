import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Review, DeleteReviewArgs } from '../../../../types/review'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: DeleteReviewArgs,
  context: Context
): Promise<Review> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.DELETE_REVIEW,
    context
  })

  const review: Review = await context.database.reviews
    .findOneAndDelete({ _id: new ObjectId(args._id) })
    .then((review) => review.value)

  await createAuditLog(AuditLogAction.DELETE_REVIEW, context)

  return review
}
