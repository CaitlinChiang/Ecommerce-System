import { Context } from '../../../../types/setup/context'
import { User, UpdateUserArgs } from '../../../../types/user'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnUpdatedData } from '../../../_utils/handleData/returnUpdatedData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: UpdateUserArgs,
  context: Context
): Promise<User> => {
  if (!args?.active) {
    await authenticateUser(context, false)
  } else {
    await authenticateUser(context, true, AdminPermission.UPDATE_ADMINISTRATOR)
  }

  const user: User = await returnUpdatedData(context, args, 'users')

  await createAuditLog(context, AuditLogAction.UPDATE_USER)

  return user
}
