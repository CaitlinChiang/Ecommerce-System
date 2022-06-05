import { Context } from 'types/context'
import { City, CreateCityArgs } from 'types/city'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: CreateCityArgs,
  context: Context
): Promise<City> => {
  authenticateUser({ admin: true }, context)

  const city: any = await context.database.cities.insertOne({
    ...args,
    createdAt: new Date()
  })

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_CITY,
    cityId: city._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return city
}
