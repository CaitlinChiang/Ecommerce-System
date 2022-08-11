import { Context } from '../../../../types/setup/context'
import { Cart, CartItem, AddCartItemArgs } from '../../../../types/cart'
import { MutateAction } from '../../../_enums/mutateAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { cartItemArgs } from '../../../_utils/handleArgs/cartItemArgs'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'

export default async (
  _root: undefined,
  args: AddCartItemArgs,
  context: Context
): Promise<Cart> => {
  await authenticateUser({ admin: false, context })

  const currentCart: Cart = await context.database.carts.findOne({
    _userId: context.currentUserId
  })

  let itemAppended = false
  let itemQuantity = 0

  for (let i = 0, n = currentCart?.items?.length; i < n; i++) {
    const cartItem: CartItem = currentCart.items[i]
    const cartItemObj = JSON.stringify(cartItemArgs(cartItem))
    const inputItemObj = JSON.stringify(cartItemArgs(args.item))

    if (cartItemObj === inputItemObj) {
      itemAppended = true
      itemQuantity = cartItem.quantity + args.item.quantity
    }
  }

  let updatedCart: Cart = {}

  if (itemAppended) {
    updatedCart = await context.database.carts
      .findOneAndUpdate(
        {
          _userId: context.currentUserId,
          items: { $elemMatch: cartItemArgs(args.item) }
        },
        { $set: { 'items.$.quantity': itemQuantity } },
        { returnDocument: 'after' }
      )
      .then((cart) => cart.value)
  } else {
    updatedCart = await context.database.carts
      .findOneAndUpdate(
        { _userId: context.currentUserId },
        { $push: { items: mutateArgs(args.item, MutateAction.CREATE) } },
        { returnDocument: 'after' }
      )
      .then((cart) => cart.value)
  }

  return updatedCart
}
