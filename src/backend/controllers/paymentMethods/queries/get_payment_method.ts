import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { PaymentMethod, GetPaymentMethodArgs } from '../../../../types/paymentMethod'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

export default async (
  _root: undefined,
  args: GetPaymentMethodArgs,
  context: Context
): Promise<PaymentMethod> => {
  await authenticateUser({ admin: true, context })

  const paymentMethod: PaymentMethod = await context.database.paymentMethods.findOne(
    { _id: new ObjectId(args._id) }
  )

  return paymentMethod
}
