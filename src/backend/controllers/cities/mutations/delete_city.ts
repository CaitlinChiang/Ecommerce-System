import { Context } from '../../../../types/setup/context'
import { DeleteCityArgs } from '../../../../types/City'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { deleteData } from '../../../_utils/handleData/deleteData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: DeleteCityArgs,
  context: Context
): Promise<void> => {
  await authenticateUser(context, true, AdminPermission.DELETE_CITY)

  await deleteData(context, args, 'cities')

  await createAuditLog(context, AuditLogAction.DELETE_CITY)
}
