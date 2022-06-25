import { Context } from '@apollo/client'
import { currentDateTime } from './dateFormatters/returnCurrentDateTime'

export const auditArgs = (context: Context): any => {
  const additionalArgs: any = {
    createdAt: currentDateTime(),
    createdBy: context.currentUserId
  }

  return additionalArgs
}
