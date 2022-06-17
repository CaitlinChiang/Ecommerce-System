import { Context } from '@apollo/client'
import { currentDateTime } from './returnCurrentDateTime'

export const auditArgs = (context: Context): any => {
  const newArgs: any = {
    createdAt: currentDateTime(),
    createdBy: context.currentUserId
  }

  return newArgs
}
