import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Cart, AddToCartArgs } from '../../../../types/cart'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

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
            { productId: new ObjectId(args?.productId) },
            { productVariantId: new ObjectId(args?.productVariantId) }
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
