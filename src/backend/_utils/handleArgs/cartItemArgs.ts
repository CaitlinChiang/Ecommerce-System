import { ObjectId } from 'mongodb'

interface CartItemArgs {
  productId?: ObjectId
  productVariantId?: ObjectId
}

export const cartItemArgs = (args: any): CartItemArgs => {
  const item: CartItemArgs = {}

  if (args?.productId) {
    item.productId = new ObjectId(args.productId)
  }

  if (args?.productVariantId) {
    item.productVariantId = new ObjectId(args.productVariantId)
  }

  return item
}
