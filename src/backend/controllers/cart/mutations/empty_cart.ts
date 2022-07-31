import { Context } from '../../../../types/setup/context'

export const emptyCart = async (context: Context): Promise<void> => {
  await context.database.carts.findOneAndUpdate(
    { _userId: context.currentUserId },
    { $set: { items: null, quantity: null, totalPrice: null } }
  )
}
