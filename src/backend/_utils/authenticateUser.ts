import { Context } from 'types/context'
import { UserPermissionArgs } from 'types/user'
import { UserType } from 'types/_enums/userType'
import { AuthenticationError } from 'apollo-server-express'

export const authenticateUser = async (args: UserPermissionArgs, context: Context): Promise<void> => {
  const { admin } = args
  const userType = context.currentUserType

  if (admin && userType != UserType.ADMIN) {
    throw new AuthenticationError('Action not permitted.')
  }
}
