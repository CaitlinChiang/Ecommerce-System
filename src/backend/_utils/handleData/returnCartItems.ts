import { Context } from '../../../types/setup/context'
import { CartItem } from '../../../types/cart'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'
import { formatPrice } from '../handleFormat/formatPrice'

export const returnCartItems = async (
  context: Context,
  items: CartItem[]
): Promise<CartItem[]> => {
  const cartItems: CartItem[] = []

  for (let i = 0, n = items?.length; i < n; i++) {
    const { productId, productVariantId, quantity, totalPrice } = items[i]

    const product: Product = await context.dataloaders.products.byId.load(productId)
    let productVariant: ProductVariant = null

    if (productVariantId) {
      productVariant = await context.dataloaders.productVariants.byId.load(
        productVariantId
      )
    }

    cartItems.push({
      product,
      productVariant,
      quantity,
      totalPrice: formatPrice(totalPrice)
    })
  }

  return cartItems
}
