import { Context } from '../../../../types/setup/context'
import { FAQ, CreateFAQArgs } from '../../../../types/faq'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutationArgs } from '../../../_utils/handleArgs/returnMutationArgs'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'

export default async (
  _root: undefined,
  args: CreateFAQArgs,
  context: Context
): Promise<FAQ> => {
  authenticateUser({ admin: true }, context)

  const faq: any = await context.database.faqs.insertOne(
    mutationArgs(args, MutateAction.CREATE)
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_FAQ,
    faqId: faq.insertedId,
    ...auditArgs(context)
  })

  return faq
}
