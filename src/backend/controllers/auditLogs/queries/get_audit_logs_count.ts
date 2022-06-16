import { Context } from '../../../../types/setup/context'
import { GetAuditLogArgs } from '../../../../types/auditLog'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: GetAuditLogArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: true }, context)

  const auditLogsCount: any = await context.database.auditLogs.countDocuments(
    queryArgs(args)
  )

  return auditLogsCount
}
