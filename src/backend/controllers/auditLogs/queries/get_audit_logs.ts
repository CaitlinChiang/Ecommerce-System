import { Context } from '../../../../types/setup/context'
import { AuditLog, GetAuditLogArgs } from '../../../../types/auditLog'
import { AdminPermission } from '../../../_enums/adminPermission'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'
import { sort, skip, limit } from '../../../_utils/handleArgs/paginateArgs'

export default async (
  _root: undefined,
  args: GetAuditLogArgs,
  context: Context
): Promise<AuditLog[]> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.VIEW_AUDIT_LOGS,
    context
  })

  const auditLogs: AuditLog[] = await context.database.auditLogs
    .find(queryArgs(args))
    .sort(sort(args?.paginateData))
    .skip(skip(args?.paginateData))
    .limit(limit(args?.paginateData))
    .toArray()

  return auditLogs
}
