import { ObjectId } from 'mongodb'
import { Context } from '../../../types/context'
import { GetOrderArgs } from '../../../types/order'
import { CartItem } from 'types/cart'
import { Payment } from '../../../types/payment'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'

export default {
  Order: {
    payment: async (args: GetOrderArgs, context: Context): Promise<Payment> => {
      const payment: Payment = await context.database.payments.findOne({
        _orderId: args._id
      })
      return payment
    },

    products: async (args: GetOrderArgs, context: Context): Promise<Product[]> => {
      const productIds: ObjectId[] = args.items
        // eslint-disable-next-line no-prototype-builtins
        .filter((item: CartItem) => item.hasOwnProperty('productId'))
        .map((item: CartItem) => item.productId)

      const products: any = await context.database.products.find({
        _id: { $in: productIds }
      })
      return products
    },

    productVariants: async (
      args: GetOrderArgs,
      context: Context
    ): Promise<ProductVariant[]> => {
      const productVariantIds: ObjectId[] = args.items
        // eslint-disable-next-line no-prototype-builtins
        .filter((item: CartItem) => item.hasOwnProperty('productVariantId'))
        .map((item: CartItem) => item.productVariantId)

      const productVariants: any = await context.database.productVariants.find({
        _id: { $in: productVariantIds }
      })
      return productVariants
    }
  }
}
