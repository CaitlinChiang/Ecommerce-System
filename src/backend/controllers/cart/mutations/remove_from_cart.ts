import { Context } from '../../../../types/setup/context'
import { Cart, RemoveFromCartArgs } from '../../../../types/cart'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: RemoveFromCartArgs,
  context: Context
): Promise<Cart> => {
  authenticateUser({ admin: false }, context)

  const cart: any = await context.database.carts.findOneAndUpdate(
    { _userId: context.currentUserId },
    {
      $pull: {
        items: {
          productId: args?.productId,
          productVariantId: args?.productVariantId
        }
      }
    }
  )
  return cart
}
