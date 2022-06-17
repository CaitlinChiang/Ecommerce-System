import { Context } from '../../../../types/setup/context'
import { FAQ, UpdateFAQArgs } from '../../../../types/faq'
import { MutateAction } from '../../../../types/_enumsBackend/mutateAction'
import { AuditLogAction } from '../../../../types/_enumsBackend/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: UpdateFAQArgs,
  context: Context
): Promise<FAQ> => {
  authenticateUser({ admin: true }, context)

  const faq: any = await context.database.faqs.findOneAndUpdate(
    { _id: args._id },
    mutationArgs(args, MutateAction.UPDATE)
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_FAQ,
    faqId: faq._id,
    ...auditArgs(context)
  })

  return faq
}
