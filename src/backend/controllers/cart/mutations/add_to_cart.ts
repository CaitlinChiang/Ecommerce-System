import { Context } from '../../../../types/_setup/context'
import { Cart, AddToCartArgs } from '../../../../types/cart'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: AddToCartArgs,
  context: Context
): Promise<Cart> => {
  authenticateUser({ admin: false }, context)

  const cart: any = await context.database.carts.findOneAndUpdate(
    { _userId: context.currentUserId },
    { items: { $push: args } }
  )
  return cart
}
