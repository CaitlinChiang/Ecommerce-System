import { Context } from '../../../../types/setup/context'
import { AuditLog, GetAuditLogArgs } from '../../../../types/auditLog'
import { AdminPermission } from '../../../_enums/adminPermission'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnDataArray } from '../../../_utils/handleData/returnDataArray'

export default async (
  _root: undefined,
  args: GetAuditLogArgs,
  context: Context
): Promise<AuditLog[]> => {
  await authenticateUser(context, true, AdminPermission.VIEW_AUDIT_LOGS)

  const auditLogs: AuditLog[] = await returnDataArray(context, args, 'auditLogs')
  return auditLogs
}
