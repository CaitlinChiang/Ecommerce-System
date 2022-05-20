import { ObjectId } from 'mongodb'
import { Context } from 'types/context'
import { Order, GetOrderArgs } from 'types/order'
import { Payment } from 'types/payment'
import { Product } from 'types/product'
import { ProductVariant } from 'types/productVariant'

export default {
  Cart: {
    products: async(
      order: Order,
      args: GetOrderArgs,
      context: Context
    ): Promise<Payment> => {
      const payment: Payment = await context.database.payments.findOne({ _orderId: args._id })
      return payment
    },

    productVariants: async(
      order: Order,
      args: GetOrderArgs,
      context: Context
    ): Promise<Payment> => {
      const payment: Payment = await context.database.payments.findOne({ _orderId: args._id })
      return payment
    },

    quantity: async(
      order: Order,
      args: GetOrderArgs,
      context: Context
    ): Promise<Payment> => {
      const payment: Payment = await context.database.payments.findOne({ _orderId: args._id })
      return payment
    },

    totalPrice: async(
      order: Order,
      args: GetOrderArgs,
      context: Context
    ): Promise<Payment> => {
      const payment: Payment = await context.database.payments.findOne({ _orderId: args._id })
      return payment
    }
  }
}
