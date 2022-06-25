import { Context } from '../../../types/setup/context'
import { CartItem } from '../../../types/cart'
import { StockQuantityAction } from '../../_enums/stockQuantityAction'

export const modifyStockQuantity = (
  items: CartItem[],
  action: StockQuantityAction,
  context: Context
): void => {
  items?.forEach(async (cartItem: CartItem) => {
    const stockQuantity =
      action == StockQuantityAction.ADD ? cartItem.quantity : -cartItem.quantity

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
