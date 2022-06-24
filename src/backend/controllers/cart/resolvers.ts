import { Context } from '../../../types/setup/context'
import { Cart, CartItem } from '../../../types/cart'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'

export default {
  Cart: {
    items: async (
      cart: Cart,
      args: undefined,
      context: Context
    ): Promise<CartItem[]> => {
      const items: any = cart?.items?.map(
        async (item: CartItem): Promise<CartItem> => {
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

          return { product, productVariant, quantity: item?.quantity }
        }
      )
      return items
    },

    quantity: async (cart: Cart): Promise<number> => {
      const itemsQuantity: number = cart.items.reduce(
        (totalQuantity: number, currentProduct: CartItem): number => {
          return totalQuantity + currentProduct.quantity
        },
        0
      )
      return itemsQuantity
    },

    totalPrice: async (cart: Cart): Promise<number> => {
      const itemsTotalPrice: number = cart.items.reduce(
        (totalPrice: number, currentProduct: CartItem): number => {
          return totalPrice + currentProduct.totalPrice
        },
        0
      )
      return itemsTotalPrice
    }
  }
}
