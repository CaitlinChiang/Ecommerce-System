import { Context } from '../../../types/setup/context'
import { Cart, CartItem } from '../../../types/cart'
import { returnCartItems } from '../../_utils/handleData/returnCartItems'

export default {
  Cart: {
    items: async (
      cart: Cart,
      args: undefined,
      context: Context
    ): Promise<CartItem[]> => {
      return await returnCartItems(cart?.items, context)
    },

    quantity: async (cart: Cart): Promise<number> => {
      if (!cart?.items || cart?.items?.length === 0) return 0

      const itemsQuantity: number = cart?.items?.reduce(
        (totalQuantity: number, currentProduct: CartItem): number => {
          return totalQuantity + currentProduct.quantity
        },
        0
      )
      return itemsQuantity
    },

    totalPrice: async (cart: Cart): Promise<number> => {
      if (!cart?.items || cart?.items?.length === 0) return 0

      const itemsTotalPrice: number = cart?.items?.reduce(
        (totalPrice: number, currentProduct: CartItem): number => {
          return totalPrice + currentProduct.totalPrice
        },
        0
      )
      return itemsTotalPrice
    }
  }
}
