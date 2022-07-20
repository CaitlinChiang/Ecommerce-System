import { Context } from '../../../types/setup/context'
import { UserType } from '../../_enums/userType'

export const returnOrdersUserId = (args: any, context: Context): void => {
  if (context.currentUserType === UserType.CUSTOMER) {
    args.userId = context.currentUserId
  }
}
