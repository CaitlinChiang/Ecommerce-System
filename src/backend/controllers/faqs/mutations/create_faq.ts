import { Context } from '../../../../types/setup/context'
import { FAQ, CreateFAQArgs } from '../../../../types/faq'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { auditArgs } from '../../../_utils/handleArgs/auditArgs'

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

  const faq: any = await context.database.faqs.insertOne(
    mutateArgs(args, MutateAction.CREATE)
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_FAQ,
    faqId: faq.insertedId,
    ...auditArgs(context)
  })

  return faq.insertedId
}
