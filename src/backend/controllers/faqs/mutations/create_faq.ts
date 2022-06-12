import { Context } from '../../../../types/setup/context'
import { FAQ, CreateFAQArgs } from '../../../../types/faq'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: CreateFAQArgs,
  context: Context
): Promise<FAQ> => {
  authenticateUser({ admin: true }, context)

  const faq: any = await context.database.faqs.insertOne({
    ...args,
    createdAt: new Date()
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_FAQ,
    faqId: faq._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return faq
}
