import { Review } from '../../../types/review'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  Review: {
    createdAt: async (review: Review): Promise<string> => {
      return formatDateTime(review?.createdAt)
    },

    updatedAt: async (review: Review): Promise<string> => {
      return formatDateTime(review?.updatedAt)
    }
  }
}
