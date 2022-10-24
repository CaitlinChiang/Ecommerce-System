import { Context } from '../../../../types/setup/context'
import { PaymentMethod, GetPaymentMethodArgs } from '../../../../types/paymentMethod'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnData } from '../../../_utils/handleData/returnData'

export default async (
  _root: undefined,
  args: GetPaymentMethodArgs,
  context: Context
): Promise<PaymentMethod> => {
  await authenticateUser(context, false)

  const paymentMethod: PaymentMethod = await returnData(
    context,
    args,
    'paymentMethods'
  )
  return paymentMethod
}
