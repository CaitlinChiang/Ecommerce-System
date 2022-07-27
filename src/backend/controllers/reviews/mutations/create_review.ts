import { Context } from '../../../../types/setup/context'
import { Review, CreateReviewArgs } from '../../../../types/review'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutationArgs } from '../../../_utils/handleArgs/returnMutationArgs'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'

export default async (
  _root: undefined,
  args: CreateReviewArgs,
  context: Context
): Promise<Review> => {
  await authenticateUser({ admin: false, context })

  const review: any = await context.database.reviews.insertOne(
    mutationArgs(args, MutateAction.CREATE)
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_REVIEW,
    reviewId: review.insertedId,
    ...auditArgs(context)
  })

  return review
}
