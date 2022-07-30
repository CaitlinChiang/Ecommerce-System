import { Context } from '../../../types/setup/context'
import { CartItem } from '../../../types/cart'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'

export const returnCartItems = async (
  items: CartItem[],
  context: Context
): Promise<CartItem[]> => {
  const cartItems: CartItem[] = []

  for (let i = 0; i < items.length; i++) {
    const product: Product = await context.dataloaders.products.byId.load(
      items[i].productId
    )

    let productVariant: ProductVariant = null

    if (items[i]?.productVariantId) {
      productVariant = await context.dataloaders.productVariants.byId.load(
        items[i]?.productVariantId
      )
    }

    cartItems.push({
      product,
      productVariant,
      quantity: items[i]?.quantity,
      totalPrice: parseFloat(Number(items[i]?.totalPrice).toFixed(2))
    })
  }

  return cartItems
}
