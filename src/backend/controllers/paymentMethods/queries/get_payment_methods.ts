import { Context } from 'types/context'
import { PaymentMethod } from 'types/paymentMethod'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<PaymentMethod[]> => {
  const paymentMethods: any = await context.database.paymentMethods.find({})
  
  return paymentMethods
}
