import { Context } from '../../../types/setup/context'
import { UserType } from '../../_enums/userType'

export const returnUserOrders = (args: any, context: Context): void => {
  if (context.userType === UserType.CUSTOMER) {
    args.userId = context.userId
  }
}
