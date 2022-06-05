import { ObjectId } from 'mongodb'
import { Context } from '../../../types/context'
import { CartItem, GetCartArgs } from '../../../types/cart'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'

export default {
  Cart: {
    products: async (args: GetCartArgs, context: Context): Promise<Product[]> => {
      const productIds: ObjectId[] = args.items
        // eslint-disable-next-line no-prototype-builtins
        .filter((cartItem: CartItem) => cartItem.hasOwnProperty('productId'))
        .map((cartItem: CartItem) => cartItem.productId)

      const products: any = await context.database.products.find({
        _id: { $in: productIds }
      })
      return products
    },

    productVariants: async (
      args: GetCartArgs,
      context: Context
    ): Promise<ProductVariant[]> => {
      const productVariantIds: ObjectId[] = args.items
        // eslint-disable-next-line no-prototype-builtins
        .filter((cartItem: CartItem) => cartItem.hasOwnProperty('productVariantId'))
        .map((cartItem: CartItem) => cartItem.productVariantId)

      const productVariants: any = await context.database.productVariants.find({
        _id: { $in: productVariantIds }
      })
      return productVariants
    },

    quantity: async (args: GetCartArgs): Promise<number> => {
      const itemsQuantity: number = args.items.reduce(
        (totalQuantity: number, currentProduct: CartItem): number => {
          return totalQuantity + currentProduct.quantity
        },
        0
      )
      return itemsQuantity
    },

    totalPrice: async (args: GetCartArgs): Promise<number> => {
      const itemsTotalPrice: number = args.items.reduce(
        (totalPrice: number, currentProduct: CartItem): number => {
          return totalPrice + currentProduct.totalPrice
        },
        0
      )
      return itemsTotalPrice
    }
  }
}
