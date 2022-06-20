import { Payment } from '../../../types/payment'
import { formatDateTime } from '../../_utils/helpers/dateFormatters/formatDateTime'

export default {
  Payment: {
    createdAt: async (payment: Payment): Promise<string> => {
      return formatDateTime(payment?.createdAt) || '-'
    },

    updatedAt: async (payment: Payment): Promise<string> => {
      return formatDateTime(payment?.updatedAt) || '-'
    }
  }
}
