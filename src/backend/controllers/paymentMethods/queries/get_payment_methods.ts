import { Context } from '../../../../types/setup/context'
import { PaymentMethod } from '../../../../types/paymentMethod'
import { authenticateUser } from '../../../_utils/authenticateUser'
import { queryArgs } from '../../../_utils/helpers/returnQueryArgs'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<PaymentMethod[]> => {
  authenticateUser({ admin: false }, context)

  const paymentMethods: any = await context.database.paymentMethods.find(
    queryArgs(args)
  )
  return paymentMethods
}
