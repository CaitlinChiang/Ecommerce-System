import { Context } from 'types/context'
import { Cart, AddToCartArgs } from 'types/cart'

export default async (
  _root: undefined,
  args: AddToCartArgs,
  context: Context
): Promise<Cart> => {
  const cart: any = await context.database.carts.findOneAndUpdate(
    { _userId: context.currentUserId }, 
    {
      products: { $push: args?.product },
      productVariants: { $push: args?.productVariant }
    }
  )
  return cart
}
