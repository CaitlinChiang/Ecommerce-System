import { City } from '../../../types/city'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  City: {
    createdAt: async (args: City): Promise<string> => {
      return formatDateTime(args?.createdAt)
    },

    updatedAt: async (args: City): Promise<string> => {
      return formatDateTime(args?.updatedAt)
    }
  }
}
