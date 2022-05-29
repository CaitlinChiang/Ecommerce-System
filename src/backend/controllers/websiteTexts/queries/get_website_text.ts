import { Context } from 'types/context'
import { WebsiteText, GetWebsiteTextArgs } from 'types/websiteText'

export default async (
  _root: undefined,
  args: GetWebsiteTextArgs,
  context: Context
): Promise<WebsiteText> => {
  const { type } = args

  const websiteText: WebsiteText = await context.database.websiteTexts.findOne({ type: type })

  return websiteText
}
