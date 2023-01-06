import { Context } from '../../../types/setup/context'
import { Review } from '../../../types/review'
import { User } from '../../../types/user'
import { formatDateTime } from '../../_utils/handleFormats/formatDateTime'

export default {
  Review: {
    createdAt: async (review: Review): Promise<string> => {
      return formatDateTime(review?.createdAt, true)
    },

    updatedAt: async (review: Review): Promise<string> => {
      return formatDateTime(review?.updatedAt, true)
    },

    updatedByEmail: async (
      review: Review,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      if (!review?.updatedBy) return ''

      const user: User = await context.dataloaders.users.byId.load(review.updatedBy)
      return user?.email
    }
  }
}
