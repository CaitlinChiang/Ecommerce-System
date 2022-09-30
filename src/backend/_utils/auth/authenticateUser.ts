import { UserInputError } from 'apollo-server-express'
import { Context } from '../../../types/setup/context'
import { AdminPermission } from '../../_enums/adminPermission'

export const authenticateUser = async (
  context: Context,
  admin: boolean,
  permission?: AdminPermission
): Promise<void> => {
  const inactive = !context.userActive
  const restricted = !context.userPermissions.includes(permission || null)

  if (admin && (inactive || restricted)) {
    throw new UserInputError('Action not permitted.')
  }
}
