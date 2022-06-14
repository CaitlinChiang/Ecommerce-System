import { Context } from '@apollo/client'

export const auditArgs = (context: Context): any => {
  const newArgs: any = {
    createdAt: new Date(),
    createdBy: context.currentUserId
  }

  return newArgs
}
