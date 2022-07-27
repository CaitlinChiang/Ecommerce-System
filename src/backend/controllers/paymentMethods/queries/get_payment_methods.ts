import { Context } from '../../../../types/setup/context'
import { PaymentMethod, GetPaymentMethodArgs } from '../../../../types/paymentMethod'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/returnQueryArgs'
import { sortArgs } from '../../../_utils/handleArgs/returnSortArgs'

export default async (
  _root: undefined,
  args: GetPaymentMethodArgs,
  context: Context
): Promise<PaymentMethod[]> => {
  await authenticateUser({ admin: false, context })

  const paymentMethods: PaymentMethod[] = await context.database.paymentMethods
    .find(queryArgs(args))
    .sort(sortArgs(args?.paginateData))
    .skip(args?.paginateData?.page * args?.paginateData?.rowsPerPage || 0)
    .limit(args?.paginateData?.rowsPerPage || 200)
    .toArray()

  return paymentMethods
}
