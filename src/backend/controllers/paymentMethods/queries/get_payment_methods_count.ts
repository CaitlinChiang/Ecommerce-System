import { Context } from 'types/context'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<number> => {
  const paymentMethodsCount: number = await context.database.paymentMethods.countDocuments()
  
  return paymentMethodsCount
}
