import { Context } from '../../../../types/setup/context'

export const emptyCart = async (context: Context): Promise<void> => {
  await context.database.carts.findOneAndUpdate(
    { _userId: context.userId },
    { $set: { items: [], quantity: 0, totalPrice: 0 } }
  )
}
