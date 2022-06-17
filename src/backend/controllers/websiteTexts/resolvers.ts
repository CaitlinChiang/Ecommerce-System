import { WebsiteText } from '../../../types/websiteText'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  WebsiteText: {
    updatedAt: async (args: WebsiteText): Promise<string> => {
      return formatDateTime(args?.updatedAt)
    }
  }
}
