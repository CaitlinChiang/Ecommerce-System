import { Context } from '../../../../types/setup/context'
import { City, UpdateCityArgs } from '../../../../types/City'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { returnUpdatedData } from '../../../_utils/handleData/returnUpdatedData'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: UpdateCityArgs,
  context: Context
): Promise<City> => {
  await authenticateUser(context, true, AdminPermission.UPDATE_CITY)

  const city: City = await returnUpdatedData(context, args, 'cities')

  await createAuditLog(context, AuditLogAction.UPDATE_CITY)

  return city
}
