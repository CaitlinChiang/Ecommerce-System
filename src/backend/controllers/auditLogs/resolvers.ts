import { Context } from '../../../types/setup/context'
import { AuditLog } from '../../../types/auditLog'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  AuditLog: {
    createdAt: async (args: AuditLog): Promise<string> => {
      return formatDateTime(args?.createdAt)
    },

    createdBy: async (args: AuditLog, context: Context): Promise<string> => {
      const user: any = await context.database.users.find({ _id: args.createdBy })
      return user?.email
    }
  }
}
