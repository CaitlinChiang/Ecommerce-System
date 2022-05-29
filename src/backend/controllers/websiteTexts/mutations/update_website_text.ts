import { Context } from 'types/context'
import { WebsiteText, UpdateWebsiteTextArgs } from 'types/websiteText'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: UpdateWebsiteTextArgs,
  context: Context
): Promise<WebsiteText> => {
  const { _id, content } = args

  const updateWebsiteText: Partial<UpdateWebsiteTextArgs> = {
    content: content,
    updatedAt: new Date()
  }
  const websiteText: any = await context.database.websiteTexts.findOneAndUpdate({ _id: _id }, updateWebsiteText)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_WEBSITE_TEXT,
    websiteTextId: websiteText._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return websiteText
}
