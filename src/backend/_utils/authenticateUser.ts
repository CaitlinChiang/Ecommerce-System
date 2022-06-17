import { Context } from '../../types/setup/context'
import { UserPermissionArgs } from '../../types/user'
import { UserType } from '../../types/_enumsBackend/userType'
import { AuthenticationError } from 'apollo-server-express'

export const authenticateUser = async (
  args: UserPermissionArgs,
  context: Context
): Promise<void> => {
  if (args.admin && context.currentUserType != UserType.ADMIN) {
    throw new AuthenticationError('Action not permitted.')
  }
}
