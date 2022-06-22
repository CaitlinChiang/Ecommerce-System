import { Context } from '../../types/setup/context'
import { UserPermissionArgs } from '../../types/user'
import { UserType } from '../_enums/userType'
import { AuthenticationError } from 'apollo-server-express'

export const authenticateUser = async (
  args: UserPermissionArgs,
  context: Context
): Promise<void> => {
  if (
    args.admin &&
    (context.currentUserType != UserType.ADMINISTRATOR || !context.currentUserActive)
  ) {
    throw new AuthenticationError('Action not permitted.')
  }
}
