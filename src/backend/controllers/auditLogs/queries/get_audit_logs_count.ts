import { Context } from '../../../../types/setup/context'
import { GetAuditLogArgs } from '../../../../types/auditLog'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/returnQueryArgs'

export default async (
  _root: undefined,
  args: GetAuditLogArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: true, context })

  const auditLogsCount: any = await context.database.auditLogs.countDocuments(
    queryArgs(args)
  )

  return auditLogsCount
}
