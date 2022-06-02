import { Context } from 'types/context'
import { GetAuditLogArgs } from 'types/auditLog'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (
  _root: undefined,
  args: GetAuditLogArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: true }, context)
  
  const auditLogsCount: number = await context.database.auditLogs.countDocuments(args)
  return auditLogsCount
}
