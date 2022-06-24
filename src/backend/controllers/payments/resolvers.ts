import { Context } from '../../../types/setup/context'
import { Payment } from '../../../types/payment'
import { PaymentMethod } from '../../../types/paymentMethod'
import { formatDateTime } from '../../_utils/helpers/dateFormatters/formatDateTime'

export default {
  Payment: {
    paymentMethod: async (
      payment: Payment,
      args: undefined,
      context: Context
    ): Promise<PaymentMethod> => {
      const paymentMethod: PaymentMethod =
        await context.dataloaders.paymentMethods.byId.load(payment?.paymentMethodId)
      return paymentMethod
    },

    createdAt: async (payment: Payment): Promise<string> => {
      return formatDateTime(payment?.createdAt) || '-'
    },

    updatedAt: async (payment: Payment): Promise<string> => {
      return formatDateTime(payment?.updatedAt) || '-'
    }
  }
}
