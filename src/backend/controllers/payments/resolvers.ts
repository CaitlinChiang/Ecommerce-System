import { Payment } from '../../../types/payment'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  Payment: {
    createdAt: async (args: Payment): Promise<string> => {
      return formatDateTime(args?.createdAt)
    },

    updatedAt: async (args: Payment): Promise<string> => {
      return formatDateTime(args?.updatedAt)
    }
  }
}
