import { PaymentMethod } from '../../../types/paymentMethod'
import { formatDateTime } from '../../_utils/helpers/dateFormatters/formatDateTime'

export default {
  PaymentMethod: {
    createdAt: async (paymentMethod: PaymentMethod): Promise<string> => {
      return formatDateTime(paymentMethod?.createdAt)
    },

    updatedAt: async (paymentMethod: PaymentMethod): Promise<string> => {
      return formatDateTime(paymentMethod?.updatedAt)
    }
  }
}
