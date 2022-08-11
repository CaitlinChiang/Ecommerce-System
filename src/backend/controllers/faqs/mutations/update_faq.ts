import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { FAQ, UpdateFAQArgs } from '../../../../types/faq'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

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

  const faq: FAQ = await context.database.faqs
    .findOneAndUpdate(
      { _id: new ObjectId(args._id) },
      { $set: mutateArgs(args, MutateAction.UPDATE) },
      { returnDocument: 'after' }
    )
    .then((faq) => faq.value)

  await createAuditLog(AuditLogAction.UPDATE_FAQ, context)

  return faq
}
