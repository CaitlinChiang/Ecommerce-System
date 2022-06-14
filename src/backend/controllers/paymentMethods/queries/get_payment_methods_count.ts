import { Context } from '../../../../types/setup/context'
import { GetPaymentMethodArgs } from '../../../../types/paymentMethod'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: GetPaymentMethodArgs,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: true }, context)

  const paymentMethodsCount: any =
    await context.database.paymentMethods.countDocuments(queryArgs(args))
  return paymentMethodsCount
}
