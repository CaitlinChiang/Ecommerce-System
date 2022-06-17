import { Context } from '../../../types/setup/context'
import { Order } from '../../../types/order'
import { Payment } from '../../../types/payment'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'
import {
  returnProductIds,
  returnProductVariantIds
} from '../../_utils/helpers/returnIdsArray'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  Order: {
    createdAt: async (order: Order): Promise<string> => {
      return formatDateTime(order?.createdAt)
    },

    payment: async (
      order: Order,
      args: undefined,
      context: Context
    ): Promise<Payment> => {
      const payment: Payment = await context.database.payments.findOne({
        _orderId: order._id
      })
      return payment
    },

    products: async (
      order: Order,
      args: undefined,
      context: Context
    ): Promise<Product[]> => {
      const products: any = await context.database.products.find({
        _id: { $in: returnProductIds(order.items) }
      })
      return products
    },

    productVariants: async (
      order: Order,
      args: undefined,
      context: Context
    ): Promise<ProductVariant[]> => {
      const productVariants: any = await context.database.productVariants.find({
        _id: { $in: returnProductVariantIds(order.items) }
      })
      return productVariants
    },

    updatedAt: async (order: Order): Promise<string> => {
      return formatDateTime(order?.updatedAt)
    }
  }
}
