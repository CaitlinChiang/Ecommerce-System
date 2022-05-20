import { Context } from 'types/context'
import { Cart, GetCartArgs } from 'types/cart'

export default async (
  _root: undefined,
  args: GetCartArgs,
  context: Context
): Promise<Cart> => {
  const cart: Cart = await context.database.carts.findOne({ _userId: args._userId })
  return cart
}
