import { Context } from '../../../../types/setup/context'
import { CreateCityArgs } from '../../../../types/city'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { createData } from '../../../_utils/handleData/createData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: CreateCityArgs,
  context: Context
): Promise<void> => {
  await authenticateUser(context, true, AdminPermission.CREATE_CITY)

  await createData(context, args, 'cities')

  await createAuditLog(context, AuditLogAction.CREATE_CITY)
}
