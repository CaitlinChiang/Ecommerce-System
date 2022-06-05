import { Context } from 'types/context'
import { WebsiteText, UpdateWebsiteTextArgs } from 'types/websiteText'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: UpdateWebsiteTextArgs,
  context: Context
): Promise<WebsiteText> => {
  authenticateUser({ admin: true }, context)

  const websiteText: any = await context.database.websiteTexts.findOneAndUpdate(
    { _id: args._id },
    { ...args, updatedAt: new Date() }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_WEBSITE_TEXT,
    websiteTextId: websiteText._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return websiteText
}
