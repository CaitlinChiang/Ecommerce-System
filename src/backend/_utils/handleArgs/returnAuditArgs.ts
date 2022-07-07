import { ObjectId } from 'mongodb'
import { Context } from '../../../types/setup/context'
import { currentDateTime } from '../handleDates/returnCurrentDateTime'

interface AuditArgs {
  createdAt: Date
  createdBy: ObjectId
}

export const auditArgs = (context: Context): AuditArgs => {
  const additionalArgs: any = {
    createdAt: currentDateTime(),
    createdBy: context.currentUserId
  }

  return additionalArgs
}
