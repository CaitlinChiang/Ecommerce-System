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
    createdAt: async (args: Order): Promise<string> => {
      return formatDateTime(args?.createdAt)
    },

    payment: async (args: Order, context: Context): Promise<Payment> => {
      const payment: Payment = await context.database.payments.findOne({
        _orderId: args._id
      })
      return payment
    },

    products: async (args: Order, context: Context): Promise<Product[]> => {
      const products: any = await context.database.products.find({
        _id: { $in: returnProductIds(args.items) }
      })
      return products
    },

    productVariants: async (
      args: Order,
      context: Context
    ): Promise<ProductVariant[]> => {
      const productVariants: any = await context.database.productVariants.find({
        _id: { $in: returnProductVariantIds(args.items) }
      })
      return productVariants
    },

    updatedAt: async (args: Order): Promise<string> => {
      return formatDateTime(args?.updatedAt)
    }
  }
}
