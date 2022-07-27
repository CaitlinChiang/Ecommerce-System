import { Context } from '../../../../types/setup/context'
import { Cart, AddCartItemArgs } from '../../../../types/cart'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

export default async (
  _root: undefined,
  args: AddCartItemArgs,
  context: Context
): Promise<Cart> => {
  await authenticateUser({ admin: false, context })

  const cart: any = await context.database.carts.findOneAndUpdate(
    { _userId: context.currentUserId },
    { items: { $push: args } }
  )

  return cart
}
