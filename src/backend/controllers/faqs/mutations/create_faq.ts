import { Context } from '../../../../types/setup/context'
import { FAQ, CreateFAQArgs } from '../../../../types/faq'
import { MutateAction } from '../../../../types/_enumsBackend/mutateAction'
import { AuditLogAction } from '../../../../types/_enumsBackend/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

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
    faqId: faq._id,
    ...auditArgs(context)
  })

  return faq
}
