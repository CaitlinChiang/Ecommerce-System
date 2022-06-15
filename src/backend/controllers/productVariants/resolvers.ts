import { Context } from '../../../types/setup/context'
import { ProductVariant } from '../../../types/productVariant'

export default {
  ProductVariant: {
    imageUrl: async (args: ProductVariant, context: Context): Promise<string> => {
      if (args?.imageUrl?.length == 0) {
        const product: any = await context.database.products.find({
          _id: args._productId
        })
        return product.imageUrl
      }
    }
  }
}
