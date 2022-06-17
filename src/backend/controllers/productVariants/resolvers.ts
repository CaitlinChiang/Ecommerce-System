import { Context } from '../../../types/setup/context'
import { ProductVariant } from '../../../types/productVariant'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  ProductVariant: {
    createdAt: async (args: ProductVariant): Promise<string> => {
      return formatDateTime(args?.createdAt)
    },

    imageUrl: async (args: ProductVariant, context: Context): Promise<string> => {
      if (args?.imageUrl?.length == 0) {
        const product: any = await context.database.products.find({
          _id: args._productId
        })
        return product.imageUrl
      }
    },

    updatedAt: async (args: ProductVariant): Promise<string> => {
      return formatDateTime(args?.updatedAt)
    }
  }
}
