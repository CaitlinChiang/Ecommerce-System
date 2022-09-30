import { Context } from '../../../types/setup/context'
import { AuditLogAction } from '../../_enums/auditLogAction'
import { currentDateTime } from '../handleFormat/returnCurrentDateTime'

export const createAuditLog = async (
  action: AuditLogAction,
  context: Context
): Promise<void> => {
  await context.database.auditLogs.insertOne({
    action,
    createdAt: currentDateTime(),
    createdBy: context.userId
  })
}
