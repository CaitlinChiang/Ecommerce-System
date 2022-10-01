import { Context } from '../../../../types/setup/context'
import { PaymentMethod, GetPaymentMethodArgs } from '../../../../types/paymentMethod'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnDataArray } from '../../../_utils/handleData/returnDataArray'

export default async (
  _root: undefined,
  args: GetPaymentMethodArgs,
  context: Context
): Promise<PaymentMethod[]> => {
  await authenticateUser(context, false)

  const paymentMethods: PaymentMethod[] = await returnDataArray(
    context,
    args,
    'paymentMethods'
  )
  return paymentMethods
}
