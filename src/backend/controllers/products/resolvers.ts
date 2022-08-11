import { Context } from '../../../types/setup/context'
import { Product } from '../../../types/product'
import { ProductCategory } from '../../../types/productCategory'
import { ProductVariant } from '../../../types/productVariant'
import { formatDate } from '../../_utils/handleFormat/formatDate'
import { formatDateTime } from '../../_utils/handleFormat/formatDateTime'

export default {
  Product: {
    category: async (
      product: Product,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      const category: ProductCategory =
        await context.dataloaders.productCategories.byId.load(product.categoryId)
      return category.name
    },

    createdAt: async (product: Product): Promise<string> => {
      return formatDateTime(product?.createdAt) || '-'
    },

    expirationDate: async (product: Product): Promise<string> => {
      return formatDate(product?.expirationDate)
    },

    stockQuantity: async (
      product: Product,
      _args: undefined,
      context: Context
    ): Promise<number> => {
      if (product?.stockQuantity) return product.stockQuantity

      const productVariants: ProductVariant[] =
        await context.dataloaders.productVariants.byProductId.load(product._id)

      const getProductVariantsStockQuantities = (): number => {
        return productVariants?.reduce(
          (
            totalStockQuantity: number,
            currentProductVariant: ProductVariant
          ): number => {
            return totalStockQuantity + currentProductVariant.stockQuantity
          },
          0
        )
      }
      return getProductVariantsStockQuantities()
    },

    updatedAt: async (product: Product): Promise<string> => {
      return formatDateTime(product?.updatedAt) || '-'
    }
  }
}
