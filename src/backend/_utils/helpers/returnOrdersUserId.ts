import { Context } from '../../../types/setup/context'
import { UserType } from '../../_enums/userType'

export const returnOrdersUserId = (modifiedArgs: any, context: Context) => {
  if (context.currentUserType == UserType.CUSTOMER) {
    modifiedArgs.userId = context.currentUserId
  }
}
