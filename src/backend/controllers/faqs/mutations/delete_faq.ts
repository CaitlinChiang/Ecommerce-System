import { Context } from 'types/context'
import { FAQ, DeleteFAQArgs } from 'types/faq'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: DeleteFAQArgs,
  context: Context
): Promise<FAQ> => {
  const { _id } = args

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_FAQ,
    faqId: _id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const faq: any = await context.database.faqs.findOneAndDelete({ _id: _id })
  
  return faq
}
