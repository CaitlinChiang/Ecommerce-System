import { Context } from '../../../../types/setup/context'
import { Cart, EditItemQuantity } from '../../../../types/cart'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { cartItemArgs } from '../../../_utils/handleArgs/cartItemArgs'

export default async (
  _root: undefined,
  args: EditItemQuantity,
  context: Context
): Promise<Cart> => {
  await authenticateUser(context, false)

  const cart: Cart = await context.database.carts
    .findOneAndUpdate(
      {
        _userId: context.userId,
        items: { $elemMatch: cartItemArgs(args) }
      },
      {
        $set: {
          'items.$.quantity': args.quantity,
          'items.$.totalPrice': args.price * args.quantity
        }
      },
      { returnDocument: 'after' }
    )
    .then((cart) => cart.value)

  return cart
}
