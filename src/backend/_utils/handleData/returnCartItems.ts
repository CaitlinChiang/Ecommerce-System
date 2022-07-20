import { Context } from '../../../types/setup/context'
import { CartItem } from '../../../types/cart'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'

export const returnCartItems = async (
  items: CartItem[],
  context: Context
): Promise<CartItem[]> => {
  const cartItems: any = items?.map(async (item: CartItem): Promise<CartItem> => {
    let product: Product = {}
    let productVariant: ProductVariant = {}

    if (item?.productId) {
      product = await context.dataloaders.products.byId.load(item?.productId)
    }

    if (item?.productVariantId) {
      productVariant = await context.dataloaders.productVariants.byId.load(
        item?.productVariantId
      )
    }

    return {
      product,
      productVariant,
      quantity: item?.quantity,
      totalPrice: parseFloat(Number(item?.totalPrice).toFixed(2))
    }
  })

  return cartItems
}
