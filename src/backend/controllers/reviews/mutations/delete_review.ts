import { Context } from '../../../../types/setup/context'
import { DeleteReviewArgs } from '../../../../types/review'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { deleteData } from '../../../_utils/handleData/deleteData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: DeleteReviewArgs,
  context: Context
): Promise<void> => {
  await authenticateUser(context, true, AdminPermission.DELETE_REVIEW)

  await deleteData(context, args, 'reviews')

  await createAuditLog(context, AuditLogAction.DELETE_REVIEW)
}
