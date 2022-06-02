import { Context } from 'types/context'
import { FAQ, UpdateFAQArgs } from 'types/faq'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (_root: undefined, args: UpdateFAQArgs, context: Context): Promise<FAQ> => {
  authenticateUser({ admin: true }, context)

  const faq: any = await context.database.faqs.findOneAndUpdate(
    { _id: args._id },
    { ...args, updatedAt: new Date()
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_FAQ,
    faqId: faq._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return faq
}
