import { Context } from '../../../../types/setup/context'
import { WebsiteText, UpdateWebsiteTextArgs } from '../../../../types/websiteText'
import { MutateAction } from '../../../../types/_enums/mutateAction'
import { AuditLogAction } from '../../../../types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { mutationArgs } from '../../../_utils/helpers/returnMutationArgs'
import { auditArgs } from '../../../_utils/helpers/returnAuditArgs'

export default async (
  _root: undefined,
  args: UpdateWebsiteTextArgs,
  context: Context
): Promise<WebsiteText> => {
  authenticateUser({ admin: true }, context)

  const websiteText: any = await context.database.websiteTexts.findOneAndUpdate(
    { _id: args._id },
    mutationArgs(args, MutateAction.UPDATE)
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_WEBSITE_TEXT,
    websiteTextId: websiteText._id,
    ...auditArgs(context)
  })

  return websiteText
}
