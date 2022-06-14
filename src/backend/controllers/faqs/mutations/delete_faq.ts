import { Context } from '../../../../types/setup/context'
import { FAQ, DeleteFAQArgs } from '../../../../types/faq'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: DeleteFAQArgs,
  context: Context
): Promise<FAQ> => {
  authenticateUser({ admin: true }, context)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_FAQ,
    faqId: args._id,
    ...auditArgs(args)
  })

  const faq: any = await context.database.faqs.findOneAndDelete({
    _id: args._id
  })
  return faq
}
