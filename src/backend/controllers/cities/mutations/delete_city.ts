import { Context } from 'types/context'
import { City, DeleteCityArgs } from 'types/City'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { authenticateUser } from 'backend/_utils/authenticateUser'

export default async (
  _root: undefined,
  args: DeleteCityArgs,
  context: Context
): Promise<City> => {
  authenticateUser({ admin: true }, context)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_CITY,
    cityId: args._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const city: any = await context.database.cities.findOneAndDelete({
    _id: args._id
  })
  return city
}
