import { Context } from '../../../../types/context'
import { GetAuditLogArgs } from '../../../../types/auditLog'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { modifiedArgsWithDateFilter } from '../../../_utils/helpers/filterDateRange'

export default async (
  _root: undefined,
  args: GetAuditLogArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: true }, context)

  const auditLogsCount: any = await context.database.auditLogs.countDocuments(
    modifiedArgsWithDateFilter(args)
  )
  return auditLogsCount
}
