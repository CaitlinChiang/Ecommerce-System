import { Context } from '../../../../types/setup/context'
import { FAQ, UpdateFAQArgs } from '../../../../types/faq'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnUpdatedData } from '../../../_utils/handleData/returnUpdatedData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: UpdateFAQArgs,
  context: Context
): Promise<FAQ> => {
  await authenticateUser(context, true, AdminPermission.UPDATE_FAQ)

  const faq: FAQ = await returnUpdatedData(context, args, 'faqs')

  await createAuditLog(context, AuditLogAction.UPDATE_FAQ)

  return faq
}
