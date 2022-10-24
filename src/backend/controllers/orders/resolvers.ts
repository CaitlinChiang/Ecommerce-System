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
      return formatDateTime(order?.createdAt, true)
    },

    deliveryAddress: async (
      order: Order,
      _args: undefined,
      context: Context
    ): Promise<DeliveryAddress> => {
      if (!order?.deliveryAddress || !order?.deliveryAddress?.cityId) return {}

      const city: City = await context.dataloaders.cities.byId.load(
        order.deliveryAddress.cityId
      )
      return { address: order.deliveryAddress.address, city }
    },

    items: async (
      order: Order,
      _args: undefined,
      context: Context
    ): Promise<CartItem[]> => {
      return await returnCartItems(context, order?.items)
    },

    itemsQuantity: async (order: Order): Promise<number> => {
      if (!order?.items || order?.items?.length === 0) return 0

      const itemsQuantity: number = order.items.reduce(
        (totalQuantity: number, currentProduct: CartItem): number => {
          return totalQuantity + currentProduct.quantity
        },
        0
      )
      return itemsQuantity
    },

    payment: async (
      order: Order,
      _args: undefined,
      context: Context
    ): Promise<Payment> => {
      if (!order?._id) return {}

      const payment: Payment = await context.dataloaders.payments.byOrderId.load(
        order._id
      )
      return payment
    },

    user: async (order: Order, args: undefined, context: Context): Promise<User> => {
      if (!order?.userId) return {}

      const user: User = await context.dataloaders.users.byId.load(order.userId)
      return user
    }
  }
}
