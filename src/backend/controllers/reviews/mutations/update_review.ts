import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Review, UpdateReviewArgs } from '../../../../types/review'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: UpdateReviewArgs,
  context: Context
): Promise<Review> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.UPDATE_REVIEW,
    context
  })

  const review: Review = await context.database.reviews
    .findOneAndUpdate(
      { _id: new ObjectId(args._id) },
      { $set: mutateArgs(args, MutateAction.UPDATE) },
      { returnDocument: 'after' }
    )
    .then((review) => review.value)

  await createAuditLog(AuditLogAction.UPDATE_REVIEW, context)

  return review
}
