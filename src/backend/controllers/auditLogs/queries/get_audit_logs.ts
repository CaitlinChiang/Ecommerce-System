import { Context } from '../../../../types/context'
import { AuditLog, GetAuditLogArgs } from '../../../../types/auditLog'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { modifiedArgsWithDateFilter } from '../../../_utils/helpers/filterDateRange'

export default async (
  _root: undefined,
  args: GetAuditLogArgs,
  context: Context
): Promise<AuditLog[]> => {
  authenticateUser({ admin: true }, context)

  const auditLogs: any = await context.database.auditLogs.find(
    modifiedArgsWithDateFilter(args)
  )
  return auditLogs
}
