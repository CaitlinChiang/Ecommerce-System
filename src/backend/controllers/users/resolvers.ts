import { User } from '../../../types/user'
import { formatDateTime } from '../../_utils/helpers/dateFormatters/formatDateTime'

export default {
  User: {
    createdAt: async (user: User): Promise<string> => {
      return formatDateTime(user?.createdAt) || '-'
    },

    updatedAt: async (user: User): Promise<string> => {
      return formatDateTime(user?.updatedAt) || '-'
    }
  }
}
