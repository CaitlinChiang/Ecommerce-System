import { Context } from '../../../types/setup/context'
import { FAQ } from '../../../types/faq'
import { User } from '../../../types/user'
import { formatDateTime } from '../../_utils/handleFormat/formatDateTime'

export default {
  FAQ: {
    createdAt: async (faq: FAQ): Promise<string> => {
      return formatDateTime(faq?.createdAt, true)
    },

    createdByEmail: async (
      faq: FAQ,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      if (!faq?.createdBy) return ''

      const user: User = await context.dataloaders.users.byId.load(faq.createdBy)
      return user?.email
    },

    updatedAt: async (faq: FAQ): Promise<string> => {
      return formatDateTime(faq?.updatedAt, true)
    },

    updatedByEmail: async (
      faq: FAQ,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      if (!faq?.updatedBy) return ''

      const user: User = await context.dataloaders.users.byId.load(faq.updatedBy)
      return user?.email
    }
  }
}
