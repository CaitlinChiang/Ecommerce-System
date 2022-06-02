import { Context } from 'types/context'
import { Cart } from 'types/cart'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<Cart> => {
  const cart: Cart = await context.database.carts.findOne({ _userId: context.currentUserId })
  return cart
}
