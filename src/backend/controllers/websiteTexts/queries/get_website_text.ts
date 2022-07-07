import { Context } from '../../../../types/setup/context'
import { WebsiteText, GetWebsiteTextArgs } from '../../../../types/websiteText'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

export default async (
  _root: undefined,
  args: GetWebsiteTextArgs,
  context: Context
): Promise<WebsiteText> => {
  authenticateUser({ admin: false }, context)

  const websiteText: WebsiteText = await context.database.websiteTexts.findOne({
    type: args.type
  })

  return websiteText
}
