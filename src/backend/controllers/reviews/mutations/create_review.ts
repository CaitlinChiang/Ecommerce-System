import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Review, CreateReviewArgs } from '../../../../types/review'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: CreateReviewArgs,
  context: Context
): Promise<Review> => {
  await authenticateUser({ admin: false, context })

  const reviewId: ObjectId = await context.database.reviews
    .insertOne(mutateArgs(args, MutateAction.CREATE))
    .then((review) => review.insertedId)

  await createAuditLog(AuditLogAction.CREATE_REVIEW, context)

  return { _id: reviewId, ...args }
}
