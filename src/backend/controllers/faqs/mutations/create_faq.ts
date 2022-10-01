import { Context } from '../../../../types/setup/context'
import { CreateFAQArgs } from '../../../../types/faq'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { createData } from '../../../_utils/handleData/createData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: CreateFAQArgs,
  context: Context
): Promise<void> => {
  await authenticateUser(context, true, AdminPermission.CREATE_FAQ)

  await createData(context, args, 'faqs')

  await createAuditLog(context, AuditLogAction.CREATE_FAQ)
}
