import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { FAQ, DeleteFAQArgs } from '../../../../types/faq'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'

export default async (
  _root: undefined,
  args: DeleteFAQArgs,
  context: Context
): Promise<FAQ> => {
  authenticateUser({ admin: true, context })

  const faq: any = await context.database.faqs.findOneAndDelete({
    _id: new ObjectId(args._id)
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_FAQ,
    faqId: new ObjectId(args._id),
    ...auditArgs(context)
  })

  return faq
}
