import { Context } from '../../../types/setup/context'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'
import { formatDate } from '../../_utils/handleFormat/formatDate'
import { formatDateTime } from '../../_utils/handleFormat/formatDateTime'

export default {
  ProductVariant: {
    createdAt: async (productVariant: ProductVariant): Promise<string> => {
      return formatDateTime(productVariant?.createdAt) || '-'
    },

    expirationDate: async (product: ProductVariant): Promise<string> => {
      return formatDate(product?.expirationDate)
    },

    imageUrl: async (
      productVariant: ProductVariant,
      args: undefined,
      context: Context
    ): Promise<string> => {
      if (productVariant?.imageUrl) return productVariant.imageUrl

      const product: Product = await context.dataloaders.products.byId.load(
        productVariant._productId
      )
      return product.imageUrl
    },

    updatedAt: async (productVariant: ProductVariant): Promise<string> => {
      return formatDateTime(productVariant?.updatedAt) || '-'
    }
  }
}
