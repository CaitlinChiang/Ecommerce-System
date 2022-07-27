import { Context } from '../../../../types/setup/context'
import { WebsiteText, UpdateWebsiteTextArgs } from '../../../../types/websiteText'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutationArgs } from '../../../_utils/handleArgs/returnMutationArgs'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'

export default async (
  _root: undefined,
  args: UpdateWebsiteTextArgs,
  context: Context
): Promise<WebsiteText> => {
  authenticateUser({
    admin: true,
    permission: AdminPermission.UPDATE_WEBSITE_TEXT,
    context
  })

  const websiteText: any = await context.database.websiteTexts.findOneAndUpdate(
    { type: args.type },
    { $set: mutationArgs(args, MutateAction.UPDATE) }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_WEBSITE_TEXT,
    websiteTextType: args.type,
    ...auditArgs(context)
  })

  return websiteText
}
