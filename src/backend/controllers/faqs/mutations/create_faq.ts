import { Context } from 'types/context'
import { FAQ, CreateFAQArgs } from 'types/faq'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: CreateFAQArgs,
  context: Context
): Promise<FAQ> => {
  const { question, answer } = args

  const createFAQ: CreateFAQArgs = {
    question: question,
    answer: answer,
    createdAt: new Date()
  }
  const faq: any = await context.database.faqs.insertOne(createFAQ)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_FAQ,
    faqId: faq._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return faq
}
