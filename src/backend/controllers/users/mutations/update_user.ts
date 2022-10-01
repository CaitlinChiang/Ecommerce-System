import { Context } from '../../../../types/setup/context'
import { User, UpdateUserArgs } from '../../../../types/user'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnUpdatedData } from '../../../_utils/handleData/returnUpdatedData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: UpdateUserArgs,
  context: Context
): Promise<User> => {
  await authenticateUser(context, false)

  const user: User = await returnUpdatedData(context, args, 'users')

  await createAuditLog(context, AuditLogAction.UPDATE_USER)

  return user
}
