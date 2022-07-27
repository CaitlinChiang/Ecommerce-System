import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { City, DeleteCityArgs } from '../../../../types/City'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'

export default async (
  _root: undefined,
  args: DeleteCityArgs,
  context: Context
): Promise<City> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.DELETE_CITY,
    context
  })

  const city: any = await context.database.cities.findOneAndDelete({
    _id: new ObjectId(args._id)
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_CITY,
    cityId: new ObjectId(args._id),
    ...auditArgs(context)
  })

  return city
}
