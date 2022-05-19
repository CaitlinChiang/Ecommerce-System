import { ObjectId } from 'mongodb'
import { Context } from 'types/context'
import { Order, GetOrderArgs } from 'types/order'
import { Payment } from 'types/payment'
import { Product } from 'types/product'
import { ProductVariant } from 'types/productVariant'

export default {
  Order: {
    payment: async(
      order: Order,
      args: GetOrderArgs,
      context: Context
    ): Promise<Payment> => {
      const payment: Payment = await context.database.payments.findOne({ _orderId: args._id })
      return payment
    },

    products: async(
      order: Order,
      args: GetOrderArgs,
      context: Context
    ): Promise<Product[]> => {
      const products: any = await context.database.products.find({ 
        _id: { $in: args.productIds.map((productId) => new ObjectId(productId)) }
      })
      return products
    },

    productVariants: async(
      order: Order,
      args: GetOrderArgs,
      context: Context
    ): Promise<ProductVariant[]> => {
      const productVariants: any = await context.database.productVariants.find({ 
        _id: { $in: args.productVariantIds.map((productVariantId) => new ObjectId(productVariantId)) }
      })
      return productVariants
    }
  }
}
