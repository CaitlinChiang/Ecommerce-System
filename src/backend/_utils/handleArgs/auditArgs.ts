import { ObjectId } from 'mongodb'
import { currentDateTime } from '../handleFormats/returnCurrentDateTime'

export const auditArgs = (
  userId: ObjectId
): { createdAt: Date; createdBy: ObjectId } => {
  return {
    createdAt: currentDateTime(),
    createdBy: userId
  }
}
