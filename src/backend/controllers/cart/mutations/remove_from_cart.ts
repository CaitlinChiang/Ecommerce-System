import { Context } from 'types/context'
import { Cart, RemoveFromCartArgs } from 'types/cart'

export default async (
  _root: undefined,
  args: RemoveFromCartArgs,
  context: Context
): Promise<Cart> => {
  const cart: any = await context.database.carts.findOneAndUpdate(
    { _userId: context.currentUserId }, 
    {
      $pull: {
        products: { productId: args?.productId },
        productVariants: { productVariantId: args?.productVariantId }
      }
    }
  )
  return cart
}
