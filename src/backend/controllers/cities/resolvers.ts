import { City } from '../../../types/city'
import { formatDateTime } from '../../_utils/helpers/dateFormatters/formatDateTime'

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
