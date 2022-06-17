import { PaymentMethod } from '../../../types/paymentMethod'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  PaymentMethod: {
    createdAt: async (args: PaymentMethod): Promise<string> => {
      return formatDateTime(args?.createdAt)
    },

    updatedAt: async (args: PaymentMethod): Promise<string> => {
      return formatDateTime(args?.updatedAt)
    }
  }
}
