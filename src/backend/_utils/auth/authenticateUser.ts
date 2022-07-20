import { AuthenticationError } from 'apollo-server-express'
import { Context } from '../../../types/setup/context'
import { UserPermissionArgs } from '../../../types/user'

export const authenticateUser = async (
  args: UserPermissionArgs,
  context: Context
): Promise<void> => {
  if (args.admin && !context.currentUserActive) {
    throw new AuthenticationError('Action not permitted.')
  }
}
