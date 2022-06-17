import { ProductCategory } from '../../../types/productCategory'
import { formatDateTime } from '../../_utils/helpers/formatDateTime'

export default {
  ProductCategory: {
    createdAt: async (args: ProductCategory): Promise<string> => {
      return formatDateTime(args?.createdAt)
    },

    updatedAt: async (args: ProductCategory): Promise<string> => {
      return formatDateTime(args?.updatedAt)
    }
  }
}
