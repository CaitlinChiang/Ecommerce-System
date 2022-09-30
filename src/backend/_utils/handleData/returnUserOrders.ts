import { Context } from '../../../types/setup/context'
import { UserType } from '../../_enums/userType'

export const returnUserOrders = (context: Context, args: any): void => {
  if (context.userType === UserType.CUSTOMER) {
    args.userId = context.userId
  }
}
