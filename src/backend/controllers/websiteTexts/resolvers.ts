import { WebsiteText } from '../../../types/websiteText'
import { formatDateTime } from '../../_utils/handleFormat/formatDateTime'

export default {
  WebsiteText: {
    updatedAt: async (websiteText: WebsiteText): Promise<string> => {
      return formatDateTime(websiteText?.updatedAt) || '-'
    }
  }
}
