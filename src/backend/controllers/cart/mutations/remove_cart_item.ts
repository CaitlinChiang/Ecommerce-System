import { Context } from '../../../../types/setup/context'
import { Cart, RemoveCartItemArgs } from '../../../../types/cart'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { cartItemArgs } from '../../../_utils/handleArgs/cartItemArgs'

export default async (
  _root: undefined,
  args: RemoveCartItemArgs,
  context: Context
): Promise<Cart> => {
  await authenticateUser({ admin: false, context })

  const cart: Cart = await context.database.carts
    .findOneAndUpdate(
      { _userId: context.currentUserId },
      { $pull: { items: cartItemArgs(args) } },
      { returnDocument: 'after' }
    )
    .then((cart) => cart.value)

  return cart
}
