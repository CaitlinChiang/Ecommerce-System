import { Context } from '../../../types/setup/context'
import { User } from '../../../types/user'
import { formatDateTime } from '../../_utils/handleFormat/formatDateTime'

export default {
  User: {
    createdAt: async (user: User): Promise<string> => {
      return formatDateTime(user?.createdAt, true)
    },

    createdByEmail: async (
      user: User,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      if (!user?.createdBy) return ''

      const userObj: User = await context.dataloaders.users.byId.load(user.createdBy)
      return userObj?.email
    },

    updatedAt: async (user: User): Promise<string> => {
      return formatDateTime(user?.updatedAt, true)
    },

    updatedByEmail: async (
      user: User,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      if (!user?.updatedBy) return ''

      const userObj: User = await context.dataloaders.users.byId.load(user.updatedBy)
      return userObj?.email
    },

    deletedAt: async (user: User): Promise<string> => {
      return formatDateTime(user?.deletedAt, true)
    },

    deletedByEmail: async (
      user: User,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      if (!user?.deletedBy) return ''

      const userObj: User = await context.dataloaders.users.byId.load(user.deletedBy)
      return userObj?.email
    }
  }
}
