import { Context } from '../../../types/_setup/context'
import { CartItem, GetCartArgs } from '../../../types/cart'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'
import {
  returnProductIds,
  returnProductVariantIds
} from '../../_utils/helpers/returnIdsArray'

export default {
  Cart: {
    products: async (args: GetCartArgs, context: Context): Promise<Product[]> => {
      const products: any = await context.database.products.find({
        _id: { $in: returnProductIds(args.items) }
      })
      return products
    },

    productVariants: async (
      args: GetCartArgs,
      context: Context
    ): Promise<ProductVariant[]> => {
      const productVariants: any = await context.database.productVariants.find({
        _id: { $in: returnProductVariantIds(args.items) }
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
