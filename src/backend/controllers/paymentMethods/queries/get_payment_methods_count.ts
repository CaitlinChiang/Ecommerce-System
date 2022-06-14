import { Context } from '../../../../types/setup/context'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: true }, context)

  const paymentMethodsCount: any =
    await context.database.paymentMethods.countDocuments(queryArgs(args))
  return paymentMethodsCount
}
