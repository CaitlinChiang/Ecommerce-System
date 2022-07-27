import { Context } from '../../../../types/setup/context'
import { Cart } from '../../../../types/cart'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

export default async (
  _root: undefined,
  args: undefined,
  context: Context
): Promise<Cart> => {
  await authenticateUser({ admin: false, context })

  const cart: Cart = await context.database.carts.findOne({
    _userId: context.currentUserId
  })

  return cart
}
