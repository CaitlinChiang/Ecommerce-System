import { Context } from '../../../types/setup/context'
import { Product } from '../../../types/product'
import { ProductVariant } from '../../../types/productVariant'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  Product: {
    category: async (
      product: Product,
      args: undefined,
      context: Context
    ): Promise<string> => {
      const category: any = await context.dataloaders.productCategories.byId.load(
        product.categoryId
      )
      return category.name
    },

    createdAt: async (product: Product): Promise<string> => {
      return formatDateTime(product?.createdAt)
    },

    stockQuantity: async (
      product: Product,
      args: undefined,
      context: Context
    ): Promise<number> => {
      const productVariants: any =
        await context.dataloaders.productVariants.byProductId.load(product._id)

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

      if (productVariants.length == 0) return product.stockQuantity
      return getProductVariantsStockQuantities()
    },

    updatedAt: async (product: Product): Promise<string> => {
      return formatDateTime(product?.updatedAt)
    }
  }
}
