import { ObjectId } from 'mongodb'
import { Context } from '../../../types/setup/context'
import { currentDateTime } from '../handleDates/returnCurrentDateTime'

export const auditArgs = (
  context: Context
): { createdAt: Date; createdBy: ObjectId } => {
  return {
    createdAt: currentDateTime(),
    createdBy: context.currentUserId
  }
}
