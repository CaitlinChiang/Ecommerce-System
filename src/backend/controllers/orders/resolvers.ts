import { Context } from '../../../types/setup/context'
import { Order } from '../../../types/order'
import { Payment } from '../../../types/payment'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'
import { User } from '../../../types/user'
import {
  returnProductIds,
  returnProductVariantIds
} from '../../_utils/helpers/returnIdsArray'
import { formatDateTime } from '../../_utils/helpers/dateFormatters/formatDateTime'

export default {
  Order: {
    createdAt: async (order: Order): Promise<string> => {
      return formatDateTime(order?.createdAt) || '-'
    },

    payment: async (
      order: Order,
      args: undefined,
      context: Context
    ): Promise<Payment> => {
      const payment: Payment = await context.dataloaders.payments.byOrderId.load(
        order._id
      )
      return payment
    },

    user: async (order: Order, args: undefined, context: Context): Promise<User> => {
      const user: User = await context.dataloaders.users.byId.load(order.userId)
      return user
    },

    updatedAt: async (order: Order): Promise<string> => {
      return formatDateTime(order?.updatedAt) || '-'
    }
  }
}
