import { Context } from '../../../types/setup/context'
import { ProductVariant } from '../../../types/productVariant'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  ProductVariant: {
    createdAt: async (productVariant: ProductVariant): Promise<string> => {
      return formatDateTime(productVariant?.createdAt)
    },

    imageUrl: async (
      productVariant: ProductVariant,
      args: undefined,
      context: Context
    ): Promise<string> => {
      if (productVariant?.imageUrl?.length == 0) {
        const product: any = await context.database.products.findOne({
          _id: productVariant._productId
        })
        return product.imageUrl
      }
    },

    updatedAt: async (productVariant: ProductVariant): Promise<string> => {
      return formatDateTime(productVariant?.updatedAt)
    }
  }
}
