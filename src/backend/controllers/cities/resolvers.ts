import { City } from '../../../types/city'
import { formatDateTime } from '../../_utils/handleFormat/formatDateTime'

export default {
  City: {
    createdAt: async (city: City): Promise<string> => {
      return formatDateTime(city?.createdAt) || '-'
    },

    updatedAt: async (city: City): Promise<string> => {
      return formatDateTime(city?.updatedAt) || '-'
    }
  }
}
