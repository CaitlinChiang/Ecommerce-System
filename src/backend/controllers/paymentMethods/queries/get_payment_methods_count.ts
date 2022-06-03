import { Context } from 'types/context'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  authenticateUser({ admin: true }, context)

  const paymentMethodsCount: number =
    await context.database.paymentMethods.countDocuments()
  return paymentMethodsCount
}
