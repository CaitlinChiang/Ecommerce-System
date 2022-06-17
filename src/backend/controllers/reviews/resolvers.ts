import { Review } from '../../../types/review'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  Review: {
    createdAt: async (args: Review): Promise<string> => {
      return formatDateTime(args?.createdAt)
    },

    updatedAt: async (args: Review): Promise<string> => {
      return formatDateTime(args?.updatedAt)
    }
  }
}
