import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { FAQ, CreateFAQArgs } from '../../../../types/faq'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: CreateFAQArgs,
  context: Context
): Promise<FAQ> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.CREATE_FAQ,
    context
  })

  const faqId: ObjectId = await context.database.faqs
    .insertOne(mutateArgs(args, MutateAction.CREATE))
    .then((faq) => faq.insertedId)

  await createAuditLog(AuditLogAction.CREATE_FAQ, context)

  return { _id: faqId, ...args }
}
