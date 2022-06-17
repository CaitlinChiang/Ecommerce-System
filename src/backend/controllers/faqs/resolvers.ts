import { FAQ } from '../../../types/faq'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  FAQ: {
    createdAt: async (args: FAQ): Promise<string> => {
      return formatDateTime(args?.createdAt)
    },

    updatedAt: async (args: FAQ): Promise<string> => {
      return formatDateTime(args?.updatedAt)
    }
  }
}
