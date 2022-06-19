import { Context } from '../../../types/setup/context'
import { AuditLog } from '../../../types/auditLog'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  AuditLog: {
    createdAt: async (args: AuditLog): Promise<string> => {
      return formatDateTime(args?.createdAt)
    },

    createdByEmail: async (
      auditLog: AuditLog,
      args: undefined,
      context: Context
    ): Promise<string> => {
      const user: any = await context.dataloaders.users.byId.load(auditLog.createdBy)
      return user.email
    }
  }
}
