import { Context } from '../../../types/setup/context'
import { AuditLog } from '../../../types/auditLog'
import { User } from '../../../types/user'
import { formatDateTime } from '../../_utils/handleFormat/formatDateTime'

export default {
  AuditLog: {
    createdAt: async (args: AuditLog): Promise<string> => {
      return formatDateTime(args?.createdAt) || '-'
    },

    createdByEmail: async (
      auditLog: AuditLog,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      if (!auditLog?.createdBy) return ''

      const user: User = await context.dataloaders.users.byId.load(
        auditLog.createdBy
      )
      return user?.email
    }
  }
}
