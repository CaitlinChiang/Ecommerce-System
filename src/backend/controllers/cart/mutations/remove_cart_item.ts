import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { Cart, RemoveCartItemArgs } from '../../../../types/cart'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

export default async (
  _root: undefined,
  args: RemoveCartItemArgs,
  context: Context
): Promise<Cart> => {
  await authenticateUser({ admin: false, context })

  const items: any = {}

  if (args?.productId) {
    items.productId = new ObjectId(args.productId)
  }
  if (args?.productVariantId) {
    items.productVariantId = new ObjectId(args.productVariantId)
  }

  const cart: any = await context.database.carts.findOneAndUpdate(
    { _userId: context.currentUserId },
    { $pull: { items } }
  )

  return cart.value
}
