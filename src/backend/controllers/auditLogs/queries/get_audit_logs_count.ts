import { Context } from '../../../../types/setup/context'
import { GetAuditLogArgs } from '../../../../types/auditLog'
import { AdminPermission } from '../../../_enums/adminPermission'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'

export default async (
  _root: undefined,
  args: GetAuditLogArgs,
  context: Context
): Promise<number> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.VIEW_AUDIT_LOGS,
    context
  })

  const auditLogsCount: any = await context.database.auditLogs.countDocuments(
    queryArgs(args)
  )

  return auditLogsCount
}
