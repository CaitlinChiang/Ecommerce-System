import { Context } from '../../../types/setup/context'
import { CartItem } from '../../../types/cart'

export const modifyStockQuantity = (
  items: CartItem[],
  action: string,
  context: Context
): void => {
  items?.forEach(async (cartItem: CartItem) => {
    const stockQuantity = action == 'ADD' ? cartItem.quantity : -cartItem.quantity

    if (cartItem?.productId) {
      await context.database.products.findOneAndUpdate(
        { _id: cartItem.productId },
        { $inc: { stockQuantity } }
      )
    }

    if (cartItem?.productVariantId) {
      await context.database.productVariants.findOneAndUpdate(
        { _id: cartItem.productVariantId },
        { $inc: { stockQuantity } }
      )
    }
  })
}
