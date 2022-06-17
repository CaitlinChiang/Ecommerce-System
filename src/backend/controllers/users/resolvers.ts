import { User } from '../../../types/user'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  User: {
    createdAt: async (args: User): Promise<string> => {
      return formatDateTime(args?.createdAt)
    },

    updatedAt: async (args: User): Promise<string> => {
      return formatDateTime(args?.updatedAt)
    }
  }
}
