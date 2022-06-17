import { Context } from '../../../types/setup/context'
import { Cart, CartItem } from '../../../types/cart'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'
import {
  returnProductIds,
  returnProductVariantIds
} from '../../_utils/helpers/returnIdsArray'

export default {
  Cart: {
    products: async (
      cart: Cart,
      args: undefined,
      context: Context
    ): Promise<Product[]> => {
      const products: any = await context.database.products.find({
        _id: { $in: returnProductIds(cart.items) }
      })
      return products
    },

    productVariants: async (
      cart: Cart,
      args: undefined,
      context: Context
    ): Promise<ProductVariant[]> => {
      const productVariants: any = await context.database.productVariants.find({
        _id: { $in: returnProductVariantIds(cart.items) }
      })
      return productVariants
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
