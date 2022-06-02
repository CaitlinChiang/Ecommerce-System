import { Context } from 'types/context'
import { PaymentMethod, GetPaymentMethodArgs } from 'types/paymentMethod'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (_root: undefined, args: GetPaymentMethodArgs, context: Context): Promise<PaymentMethod> => {
  authenticateUser({ admin: true }, context)

  const paymentMethod: PaymentMethod = await context.database.paymentMethods.findOne({ _id: args._id })
  return paymentMethod
}
