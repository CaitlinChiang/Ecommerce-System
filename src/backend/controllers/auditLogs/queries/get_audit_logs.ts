import { Context } from '../../../../types/setup/context'
import { AuditLog, GetAuditLogArgs } from '../../../../types/auditLog'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'
import { sortArgs } from '../../../_utils/helpers/returnSortArgs'

export default async (
  _root: undefined,
  args: GetAuditLogArgs,
  context: Context
): Promise<AuditLog[]> => {
  authenticateUser({ admin: true }, context)

  const auditLogs: any = await context.database.auditLogs
    .find(queryArgs(args))
    .sort(sortArgs(args?.paginateData))
    .skip(args?.paginateData?.offset)
    .limit(args?.paginateData?.rowsPerPage)

  return auditLogs
}
