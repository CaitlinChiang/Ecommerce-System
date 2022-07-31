import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { FAQ, UpdateFAQArgs } from '../../../../types/faq'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { auditArgs } from '../../../_utils/handleArgs/auditArgs'

export default async (
  _root: undefined,
  args: UpdateFAQArgs,
  context: Context
): Promise<FAQ> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.UPDATE_FAQ,
    context
  })

  const faq: any = await context.database.faqs.findOneAndUpdate(
    { _id: new ObjectId(args._id) },
    { $set: mutateArgs(args, MutateAction.UPDATE) }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_FAQ,
    faqId: new ObjectId(faq._id),
    ...auditArgs(context)
  })

  return faq.value
}
