import { Context } from '../../../../types/setup/context'
import { PaymentMethod, GetPaymentMethodArgs } from '../../../../types/paymentMethod'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'
import { sort, skip, limit } from '../../../_utils/handleArgs/paginateArgs'

export default async (
  _root: undefined,
  args: GetPaymentMethodArgs,
  context: Context
): Promise<PaymentMethod[]> => {
  await authenticateUser({ admin: false, context })

  const paymentMethods: PaymentMethod[] = await context.database.paymentMethods
    .find(queryArgs(args))
    .sort(sort(args?.paginateData))
    .skip(skip(args?.paginateData))
    .limit(limit(args?.paginateData))
    .toArray()

  return paymentMethods
}
