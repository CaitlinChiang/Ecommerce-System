import { Context } from '../../../types/setup/context'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'
import { User } from '../../../types/user'
import { formatDate } from '../../_utils/handleFormats/formatDate'
import { formatDateTime } from '../../_utils/handleFormats/formatDateTime'

export default {
  ProductVariant: {
    createdAt: async (productVariant: ProductVariant): Promise<string> => {
      return formatDateTime(productVariant?.createdAt, true)
    },

    createdByEmail: async (
      productVariant: ProductVariant,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      if (!productVariant?.createdBy) return ''

      const user: User = await context.dataloaders.users.byId.load(
        productVariant.createdBy
      )
      return user?.email
    },

    expirationDate: async (product: ProductVariant): Promise<string> => {
      return formatDate(product?.expirationDate, true)
    },

    imageUrl: async (
      productVariant: ProductVariant,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      if (productVariant?.imageUrl) return productVariant.imageUrl

      const product: Product = await context.dataloaders.products.byId.load(
        productVariant._productId
      )
      return product.imageUrl
    },

    updatedAt: async (productVariant: ProductVariant): Promise<string> => {
      return formatDateTime(productVariant?.updatedAt, true)
    },

    updatedByEmail: async (
      productVariant: ProductVariant,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      if (!productVariant?.updatedBy) return ''

      const user: User = await context.dataloaders.users.byId.load(
        productVariant.updatedBy
      )
      return user?.email
    }
  }
}
