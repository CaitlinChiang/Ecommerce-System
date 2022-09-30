import { ObjectId } from 'mongodb'
import { CartItemArgs } from '../../../types/cart'

export const cartItemArgs = (args: any): CartItemArgs => {
  const cartItem: CartItemArgs = {}

  if (args?.productId) {
    cartItem.productId = new ObjectId(args.productId)
  }
  if (args?.productVariantId) {
    cartItem.productVariantId = new ObjectId(args.productVariantId)
  }

  return cartItem
}
