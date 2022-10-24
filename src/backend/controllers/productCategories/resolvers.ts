import { Context } from '../../../types/setup/context'
import { ProductCategory } from '../../../types/productCategory'
import { User } from '../../../types/user'
import { formatDateTime } from '../../_utils/handleFormat/formatDateTime'

export default {
  ProductCategory: {
    createdAt: async (productCategory: ProductCategory): Promise<string> => {
      return formatDateTime(productCategory?.createdAt, true)
    },

    createdByEmail: async (
      productCategory: ProductCategory,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      if (!productCategory?.createdBy) return ''

      const user: User = await context.dataloaders.users.byId.load(
        productCategory.createdBy
      )
      return user?.email
    },

    updatedAt: async (productCategory: ProductCategory): Promise<string> => {
      return formatDateTime(productCategory?.updatedAt, true)
    },

    updatedByEmail: async (
      productCategory: ProductCategory,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      if (!productCategory?.updatedBy) return ''

      const user: User = await context.dataloaders.users.byId.load(
        productCategory.updatedBy
      )
      return user?.email
    }
  }
}
