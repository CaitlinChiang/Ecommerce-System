import { Context } from '../../../types/setup/context'
import { WebsiteText } from '../../../types/websiteText'
import { User } from '../../../types/user'
import { formatDateTime } from '../../_utils/handleFormat/formatDateTime'

export default {
  WebsiteText: {
    updatedAt: async (websiteText: WebsiteText): Promise<string> => {
      return formatDateTime(websiteText?.updatedAt, true)
    },

    updatedByEmail: async (
      websiteText: WebsiteText,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      if (!websiteText?.updatedBy) return ''

      const user: User = await context.dataloaders.users.byId.load(
        websiteText.updatedBy
      )
      return user?.email
    }
  }
}
