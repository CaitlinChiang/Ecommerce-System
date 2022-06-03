import { Context } from 'types/context'
import { Cart } from 'types/cart'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<Cart> => {
  authenticateUser({ admin: false }, context)

  const cart: Cart = await context.database.carts.findOne({
    _userId: context.currentUserId
  })
  return cart
}
