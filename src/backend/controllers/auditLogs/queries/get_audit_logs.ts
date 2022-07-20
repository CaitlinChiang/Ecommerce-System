import { Context } from '../../../../types/setup/context'
import { AuditLog, GetAuditLogArgs } from '../../../../types/auditLog'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/returnQueryArgs'
import { sortArgs } from '../../../_utils/handleArgs/returnSortArgs'

export default async (
  _root: undefined,
  args: GetAuditLogArgs,
  context: Context
): Promise<AuditLog[]> => {
  authenticateUser({ admin: true, context })

  const auditLogs: AuditLog[] = await context.database.auditLogs
    .find(queryArgs(args))
    .sort(sortArgs(args?.paginateData))
    .skip(args?.paginateData?.page * args?.paginateData?.rowsPerPage || 0)
    .limit(args?.paginateData?.rowsPerPage || 200)
    .toArray()

  return auditLogs
}
