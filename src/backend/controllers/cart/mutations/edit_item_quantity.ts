import { Context } from 'types/context'
import { Cart, AddToCartArgs } from 'types/cart'
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
      products: {
        $elemMatch: { _id: args?.product.productId }
      },
      productVariants: {
        $elemMatch: { _id: args?.productVariant.productVariantId }
      }
    },
    {
      $set: {
        'products.$.quantity': args?.product.quantity,
        'productVariants.$.quantity': args?.productVariant.quantity
      }
    }
  )
  return cart
}
