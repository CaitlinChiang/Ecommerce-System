import { Context } from '../../../types/setup/context'
import { CartItem } from '../../../types/cart'
import { StockQuantityAction } from '../../_enums/stockQuantity'

export const updateStockQuantity = async (
  context: Context,
  action: StockQuantityAction,
  items: CartItem[]
): Promise<void> => {
  for (let i = 0, n = items.length; i < n; i++) {
    const { productId, productVariantId, quantity } = items[i]

    const stockQuantity = action === StockQuantityAction.ADD ? quantity : -quantity

    if (productId) {
      await context.database.products.findOneAndUpdate(
        { _id: productId },
        { $inc: { stockQuantity } }
      )
    }
    if (productVariantId) {
      await context.database.productVariants.findOneAndUpdate(
        { _id: productVariantId },
        { $inc: { stockQuantity } }
      )
    }
  }
}
