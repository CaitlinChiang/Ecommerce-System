import { ProductCategory } from '../../../types/productCategory'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  ProductCategory: {
    createdAt: async (productCategory: ProductCategory): Promise<string> => {
      return formatDateTime(productCategory?.createdAt)
    },

    updatedAt: async (productCategory: ProductCategory): Promise<string> => {
      return formatDateTime(productCategory?.updatedAt)
    }
  }
}