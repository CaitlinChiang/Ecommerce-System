import { UserInputError } from 'apollo-server-express'
import { AdminPermission } from '../../_enums/adminPermission'
import { Context } from '../../../types/setup/context'

export const authenticateUser = async ({
  admin,
  permission,
  context
}: {
  admin: boolean
  permission?: AdminPermission
  context: Context
}): Promise<void> => {
  const inactiveAdmin = admin && !context.currentUserActive
  const restrictedAdmin =
    admin && permission && !context.currentUserPermissions.includes(permission)

  if (inactiveAdmin || restrictedAdmin) {
    throw new UserInputError('Action not permitted.')
  }
}
