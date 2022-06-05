import { Context } from '../../../../types/context'
import { PaymentMethod } from '../../../../types/paymentMethod'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<PaymentMethod[]> => {
  authenticateUser({ admin: false }, context)

  const paymentMethods: any = await context.database.paymentMethods.find({})
  return paymentMethods
}
