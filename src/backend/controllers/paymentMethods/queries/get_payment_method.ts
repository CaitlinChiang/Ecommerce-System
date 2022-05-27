import { Context } from 'types/context'
import { PaymentMethod, GetPaymentMethodArgs } from 'types/paymentMethod'

export default async (
  _root: undefined,
  args: GetPaymentMethodArgs,
  context: Context
): Promise<PaymentMethod> => {
  const { _id } = args

  const paymentMethod: PaymentMethod = await context.database.paymentMethods.findOne({ _id: _id })

  return paymentMethod
}
