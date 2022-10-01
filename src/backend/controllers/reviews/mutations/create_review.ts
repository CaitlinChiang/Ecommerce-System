import { Context } from '../../../../types/setup/context'
import { CreateReviewArgs } from '../../../../types/review'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { createData } from '../../../_utils/handleData/createData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: CreateReviewArgs,
  context: Context
): Promise<void> => {
  await authenticateUser(context, false)

  await createData(context, args, 'reviews')

  await createAuditLog(context, AuditLogAction.CREATE_REVIEW)
}
