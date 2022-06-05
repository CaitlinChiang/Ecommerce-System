import { Context } from 'types/context'
import { AuditLog, GetAuditLogArgs } from 'types/auditLog'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: GetAuditLogArgs,
  context: Context
): Promise<AuditLog[]> => {
  authenticateUser({ admin: true }, context)

  const auditLogs: any = await context.database.auditLogs.find(args)
  return auditLogs
}
