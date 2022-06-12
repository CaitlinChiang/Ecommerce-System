import { Context } from '../../../../types/setup/context'
import { AuditLog, GetAuditLogArgs } from '../../../../types/auditLog'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { modifiedArgsWithDateFilter } from '../../../_utils/helpers/filterDateRange'

export default async (
  _root: undefined,
  args: GetAuditLogArgs,
  context: Context
): Promise<AuditLog[]> => {
  authenticateUser({ admin: true }, context)

  const modifiedArgs: GetAuditLogArgs = {
    ...modifiedArgsWithDateFilter(args)
  }

  const auditLogs: any = await context.database.auditLogs.find(modifiedArgs)
  return auditLogs
}
