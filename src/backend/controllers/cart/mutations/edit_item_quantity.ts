import { Context } from '../../../../types/context'
import { Cart, AddToCartArgs } from '../../../../types/cart'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: AddToCartArgs,
  context: Context
): Promise<Cart> => {
  authenticateUser({ admin: false }, context)

  const cart: any = await context.database.carts.findOneAndUpdate(
    {
      _userId: context.currentUserId,
      items: {
        $elemMatch: {
          $or: [
            { productId: args?.productId },
            { productVariantId: args?.productVariantId }
          ]
        }
      }
    },
    {
      $set: { 'items.$.quantity': args.quantity }
    }
  )
  return cart
}
