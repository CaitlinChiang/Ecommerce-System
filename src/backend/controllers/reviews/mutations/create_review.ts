import { Context } from '../../../../types/setup/context'
import { Review, CreateReviewArgs } from '../../../../types/review'
import { MutateAction } from '../../../../types/_enumsBackend/mutateAction'
import { AuditLogAction } from '../../../../types/_enumsBackend/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: CreateReviewArgs,
  context: Context
): Promise<Review> => {
  authenticateUser({ admin: false }, context)

  const review: any = await context.database.reviews.insertOne(
    mutationArgs(args, MutateAction.CREATE)
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_REVIEW,
    reviewId: review._id,
    ...auditArgs(context)
  })

  return review
}
