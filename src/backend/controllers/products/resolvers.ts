import { Context } from '../../../types/setup/context'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'

export default {
  Product: {
    category: async (args: Product, context: Context): Promise<string> => {
      const category: any = await context.database.productCategories.find({
        _id: args.categoryId
      })
      return category.name
    },

    stockQuantity: async (args: Product, context: Context): Promise<number> => {
      const productVariants: any = await context.database.productVariants
        .find({
          _productId: args._id
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
    }
  }
}
