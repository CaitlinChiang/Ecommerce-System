import { Context } from '../../../types/setup/context'
import { PaymentMethod } from '../../../types/paymentMethod'
import { User } from '../../../types/user'
import { formatDateTime } from '../../_utils/handleFormat/formatDateTime'

export default {
  PaymentMethod: {
    createdAt: async (paymentMethod: PaymentMethod): Promise<string> => {
      return formatDateTime(paymentMethod?.createdAt, true)
    },

    createdByEmail: async (
      paymentMethod: PaymentMethod,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      if (!paymentMethod?.createdBy) return ''

      const user: User = await context.dataloaders.users.byId.load(
        paymentMethod.createdBy
      )
      return user?.email
    },

    updatedAt: async (paymentMethod: PaymentMethod): Promise<string> => {
      return formatDateTime(paymentMethod?.updatedAt, true)
    },

    updatedByEmail: async (
      paymentMethod: PaymentMethod,
      _args: undefined,
      context: Context
    ): Promise<string> => {
      if (!paymentMethod?.updatedBy) return ''

      const user: User = await context.dataloaders.users.byId.load(
        paymentMethod.updatedBy
      )
      return user?.email
    }
  }
}
