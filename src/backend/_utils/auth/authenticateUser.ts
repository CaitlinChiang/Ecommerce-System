import { AuthenticationError } from 'apollo-server-express'
import { Context } from '../../../types/setup/context'

export const authenticateUser = async ({
  admin,
  context
}: {
  admin: boolean
  context: Context
}): Promise<void> => {
  if (admin && !context.currentUserActive) {
    throw new AuthenticationError('Action not permitted.')
  }
}
