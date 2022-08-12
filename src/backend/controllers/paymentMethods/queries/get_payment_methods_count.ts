import { Context } from '../../../../types/setup/context'
import { GetPaymentMethodArgs } from '../../../../types/paymentMethod'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { queryArgs } from '../../../_utils/handleArgs/queryArgs'

export default async (
  _root: undefined,
  args: GetPaymentMethodArgs,
  context: Context
): Promise<number> => {
  await authenticateUser({ admin: false, context })

  const count: any = await context.database.paymentMethods.countDocuments(
    queryArgs(args)
  )

  return count
}
