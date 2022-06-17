import { ObjectId } from 'mongodb'
import { Context } from '../../../types/setup/context'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  Product: {
    category: async (args: Product, context: Context): Promise<string> => {
      const category: any = await context.database.productCategories.find({
        _id: args.categoryId
      })
      return category.name
    },

    createdAt: async (args: Product): Promise<string> => {
      return formatDateTime(args?.createdAt)
    },

    stockQuantity: async (args: Product, context: Context): Promise<number> => {
      const productVariants: any = await context.database.productVariants
        .find({
          _productId: new ObjectId(args._id)
        })
        .map((productVariant: ProductVariant): ProductVariant => productVariant)

      const getProductVariantsStockQuantities = (): number => {
        return productVariants.reduce(
          (
            totalStockQuantity: number,
            currentProductVariant: ProductVariant
          ): number => {
            return totalStockQuantity + currentProductVariant.stockQuantity
          },
          0
        )
      }

      if (productVariants.length == 0) return args.stockQuantity
      return getProductVariantsStockQuantities()
    },

    updatedAt: async (args: Product): Promise<string> => {
      return formatDateTime(args?.updatedAt)
    }
  }
}
