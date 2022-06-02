import { Context } from 'types/context'
import { Cart, RemoveFromCartArgs } from 'types/cart'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (
  _root: undefined,
  args: RemoveFromCartArgs,
  context: Context
): Promise<Cart> => {
  authenticateUser({ admin: false }, context)

  const { productId, productVariantId } = args

  const cart: any = await context.database.carts.findOneAndUpdate(
    { _userId: context.currentUserId }, 
    {
      $pull: {
        products: { productId: productId },
        productVariants: { productVariantId: productVariantId }
      }
    }
  )
  return cart
}
