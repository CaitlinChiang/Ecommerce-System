import { FAQ } from '../../../types/faq'
import { formatDateTime } from '../../_utils/handleDates/formatDateTime'

export default {
  FAQ: {
    createdAt: async (faq: FAQ): Promise<string> => {
      return formatDateTime(faq?.createdAt) || '-'
    },

    updatedAt: async (faq: FAQ): Promise<string> => {
      return formatDateTime(faq?.updatedAt) || '-'
    }
  }
}
