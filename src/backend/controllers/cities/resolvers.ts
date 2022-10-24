import { Context } from '../../../types/setup/context'
import { City } from '../../../types/city'
import { User } from '../../../types/user'
import { formatDateTime } from '../../_utils/handleFormat/formatDateTime'

export default {
  City: {
    createdAt: async (city: City): Promise<string> => {
      return formatDateTime(city?.createdAt, true)
    },

    createdByEmail: async (
      city: City,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      if (!city?.createdBy) return ''

      const user: User = await context.dataloaders.users.byId.load(city.createdBy)
      return user?.email
    },

    updatedAt: async (city: City): Promise<string> => {
      return formatDateTime(city?.updatedAt, true)
    },

    updatedByEmail: async (
      city: City,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      if (!city?.updatedBy) return ''

      const user: User = await context.dataloaders.users.byId.load(city.updatedBy)
      return user?.email
    }
  }
}
