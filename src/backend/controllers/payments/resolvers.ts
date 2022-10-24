import { Context } from '../../../types/setup/context'
import { Payment } from '../../../types/payment'
import { PaymentMethod } from '../../../types/paymentMethod'

export default {
  Payment: {
    paymentMethod: async (
      payment: Payment,
      _args: undefined,
      context: Context
    ): Promise<PaymentMethod> => {
      if (!payment?.paymentMethodId) return {}

      const paymentMethod: PaymentMethod =
        await context.dataloaders.paymentMethods.byId.load(payment.paymentMethodId)
      return paymentMethod
    }
  }
}
