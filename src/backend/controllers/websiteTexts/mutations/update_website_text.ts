import { Context } from '../../../../types/setup/context'
import { WebsiteText, UpdateWebsiteTextArgs } from '../../../../types/websiteText'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: UpdateWebsiteTextArgs,
  context: Context
): Promise<WebsiteText> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.UPDATE_WEBSITE_TEXT,
    context
  })

  const websiteText: WebsiteText = await context.database.websiteTexts
    .findOneAndUpdate(
      { type: args.type },
      { $set: mutateArgs(args, MutateAction.UPDATE) },
      { returnDocument: 'after' }
    )
    .then((websiteText) => websiteText.value)

  await createAuditLog(AuditLogAction.UPDATE_WEBSITE_TEXT, context)

  return websiteText
}
