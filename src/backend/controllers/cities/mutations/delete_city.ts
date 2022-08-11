import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { City, DeleteCityArgs } from '../../../../types/City'
import { AdminPermission } from '../../../_enums/adminPermission'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

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

  const city: City = await context.database.cities
    .findOneAndDelete({
      _id: new ObjectId(args._id)
    })
    .then((city) => city.value)

  await createAuditLog(AuditLogAction.DELETE_CITY, context)

  return city
}
