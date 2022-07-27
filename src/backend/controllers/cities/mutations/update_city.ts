import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { City, UpdateCityArgs } from '../../../../types/City'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutationArgs } from '../../../_utils/handleArgs/returnMutationArgs'
import { auditArgs } from '../../../_utils/handleArgs/returnAuditArgs'

export default async (
  _root: undefined,
  args: UpdateCityArgs,
  context: Context
): Promise<City> => {
  authenticateUser({ admin: true, permission: AdminPermission.UPDATE_CITY, context })

  const city: any = await context.database.cities.findOneAndUpdate(
    { _id: new ObjectId(args._id) },
    { $set: mutationArgs(args, MutateAction.UPDATE) }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_CITY,
    cityId: new ObjectId(city._id),
    ...auditArgs(context)
  })

  return city
}
