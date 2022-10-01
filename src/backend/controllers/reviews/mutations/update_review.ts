import { Context } from '../../../../types/setup/context'
import { Review, UpdateReviewArgs } from '../../../../types/review'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnUpdatedData } from '../../../_utils/handleData/returnUpdatedData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: UpdateReviewArgs,
  context: Context
): Promise<Review> => {
  await authenticateUser(context, true, AdminPermission.UPDATE_REVIEW)

  const review: Review = await returnUpdatedData(context, args, 'reviews')

  await createAuditLog(context, AuditLogAction.UPDATE_REVIEW)

  return review
}
