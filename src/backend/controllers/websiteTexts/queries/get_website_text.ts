import { Context } from '../../../../types/_setup/context'
import { WebsiteText, GetWebsiteTextArgs } from '../../../../types/websiteText'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: GetWebsiteTextArgs,
  context: Context
): Promise<WebsiteText> => {
  authenticateUser({ admin: false }, context)

  const websiteText: WebsiteText = await context.database.websiteTexts.findOne(args)
  return websiteText
}
