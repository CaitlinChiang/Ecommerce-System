import { Context } from '../../../types/setup/context'
import { GetOrderArgs } from '../../../types/order'
import { Payment } from '../../../types/payment'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'
import {
  returnProductIds,
  returnProductVariantIds
} from '../../_utils/helpers/returnIdsArray'

export default {
  Order: {
    payment: async (args: GetOrderArgs, context: Context): Promise<Payment> => {
      const payment: Payment = await context.database.payments.findOne({
        _orderId: args._id
      })
      return payment
    },

    products: async (args: GetOrderArgs, context: Context): Promise<Product[]> => {
      const products: any = await context.database.products.find({
        _id: { $in: returnProductIds(args.items) }
      })
      return products
    },

    productVariants: async (
      args: GetOrderArgs,
      context: Context
    ): Promise<ProductVariant[]> => {
      const productVariants: any = await context.database.productVariants.find({
        _id: { $in: returnProductVariantIds(args.items) }
      })
      return productVariants
    }
  }
}
