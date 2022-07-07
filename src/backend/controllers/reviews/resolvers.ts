import { Review } from '../../../types/review'
import { formatDateTime } from '../../_utils/handleDates/formatDateTime'

export default {
  Review: {
    createdAt: async (review: Review): Promise<string> => {
      return formatDateTime(review?.createdAt) || '-'
    },

    updatedAt: async (review: Review): Promise<string> => {
      return formatDateTime(review?.updatedAt) || '-'
    }
  }
}
