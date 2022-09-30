import { Context } from '../../../types/setup/context'
import { AuditLogAction } from '../../_enums/auditLogAction'
import { currentDateTime } from '../handleFormat/returnCurrentDateTime'

export const createAuditLog = async (
  context: Context,
  action: AuditLogAction
): Promise<void> => {
  await context.database.auditLogs.insertOne({
    action,
    createdAt: currentDateTime(),
    createdBy: context.userId
  })
}
