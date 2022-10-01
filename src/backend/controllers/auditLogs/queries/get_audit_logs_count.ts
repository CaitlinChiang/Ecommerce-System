import { Context } from '../../../../types/setup/context'
import { GetAuditLogArgs } from '../../../../types/auditLog'
import { AdminPermission } from '../../../_enums/adminPermission'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnDataCount } from '../../../_utils/handleData/returnDataCount'

export default async (
  _root: undefined,
  args: GetAuditLogArgs,
  context: Context
): Promise<number> => {
  await authenticateUser(context, true, AdminPermission.VIEW_AUDIT_LOGS)

  const count: number = await returnDataCount(context, args, 'auditLogs')
  return count
}
