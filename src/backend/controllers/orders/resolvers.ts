import { Context } from '../../../types/setup/context'
import { CartItem } from '../../../types/cart'
import { City } from '../../../types/city'
import { DeliveryAddress } from '../../../types/common/deliveryAddress'
import { Order } from '../../../types/order'
import { Payment } from '../../../types/payment'
import { User } from '../../../types/user'
import { formatDateTime } from '../../_utils/handleFormat/formatDateTime'
import { returnCartItems } from '../../_utils/handleData/returnCartItems'

export default {
  Order: {
    createdAt: async (order: Order): Promise<string> => {
      return formatDateTime(order?.createdAt) || '-'
    },

    deliveryAddress: async (
      order: Order,
      args: undefined,
      context: Context
    ): Promise<DeliveryAddress> => {
      if (!order?.deliveryAddress) return

      const city: City = await context.dataloaders.cities.byId.load(
        order?.deliveryAddress?.cityId
      )
      return { address: order?.deliveryAddress?.address, city }
    },

    items: async (
      order: Order,
      args: undefined,
      context: Context
    ): Promise<CartItem[]> => {
      return await returnCartItems(order?.items, context)
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
