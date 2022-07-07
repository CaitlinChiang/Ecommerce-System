import { Context } from '../../../types/setup/context'
import { CartItem } from '../../../types/cart'
import { City } from '../../../types/city'
import { DeliveryAddress } from '../../../types/common/deliveryAddress'
import { Order } from '../../../types/order'
import { Payment } from '../../../types/payment'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'
import { User } from '../../../types/user'
import { formatDateTime } from '../../_utils/handleDates/formatDateTime'

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
      const items: any = order?.items?.map(
        async (item: CartItem): Promise<CartItem> => {
          let product: Product = {}
          let productVariant: ProductVariant = {}

          if (item?.productId) {
            product = await context.dataloaders.products.byId.load(item?.productId)
          }

          if (item?.productVariantId) {
            productVariant = await context.dataloaders.productVariants.byId.load(
              item?.productVariantId
            )
          }

          return { product, productVariant, quantity: item?.quantity }
        }
      )
      return items
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
