import { Context } from 'types/context'
import { FAQ, UpdateFAQArgs } from 'types/faq'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: UpdateFAQArgs,
  context: Context
): Promise<FAQ> => {
  const { _id, question, answer } = args

  const updateFAQ: Partial<UpdateFAQArgs> = {
    answer: answer,
    question: question,
    updatedAt: new Date()
  }
  const faq: any = await context.database.faqs.findOneAndUpdate({ _id: _id }, updateFAQ)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_FAQ,
    faqId: faq._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return faq
}
