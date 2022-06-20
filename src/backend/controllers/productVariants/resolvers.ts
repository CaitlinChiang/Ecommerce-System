import { Context } from '../../../types/setup/context'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'
import { formatDate } from '../../_utils/helpers/formatDate'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  ProductVariant: {
    createdAt: async (productVariant: ProductVariant): Promise<string> => {
      return formatDateTime(productVariant?.createdAt)
    },

    expirationDate: async (product: ProductVariant): Promise<string> => {
      return formatDate(product?.expirationDate)
    },

    imageUrl: async (
      productVariant: ProductVariant,
      args: undefined,
      context: Context
    ): Promise<string> => {
      if (productVariant?.imageUrl?.length == 0) {
        const product: Product = await context.dataloaders.products.byId.load(
          productVariant._productId
        )
        return product.imageUrl
      }
    },

    updatedAt: async (productVariant: ProductVariant): Promise<string> => {
      return formatDateTime(productVariant?.updatedAt)
    }
  }
}
