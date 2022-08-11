import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { FAQ, DeleteFAQArgs } from '../../../../types/faq'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: DeleteFAQArgs,
  context: Context
): Promise<FAQ> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.DELETE_FAQ,
    context
  })

  const faq: FAQ = await context.database.faqs
    .findOneAndDelete({
      _id: new ObjectId(args._id)
    })
    .then((faq) => faq.value)

  await createAuditLog(AuditLogAction.DELETE_FAQ, context)

  return faq
}
