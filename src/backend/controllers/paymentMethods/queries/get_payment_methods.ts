import { Context } from '../../../../types/setup/context'
import { PaymentMethod, GetPaymentMethodArgs } from '../../../../types/paymentMethod'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'
import { sortArgs } from 'backend/_utils/helpers/returnSortArgs'

export default async (
  _root: undefined,
  args: GetPaymentMethodArgs,
  context: Context
): Promise<PaymentMethod[]> => {
  authenticateUser({ admin: false }, context)

  const paymentMethods: any = await context.database.paymentMethods
    .find(queryArgs(args))
    .sort(sortArgs(args?.paginateData))
    .skip(args?.paginateData?.offset)
    .limit(args?.paginateData?.rowsPerPage)
  return paymentMethods
}
