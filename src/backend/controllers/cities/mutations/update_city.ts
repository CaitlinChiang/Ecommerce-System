import { Context } from 'types/context'
import { City, UpdateCityArgs } from 'types/City'
import { AuditLogAction } from 'types/_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/authenticateUser'

export default async (
  _root: undefined,
  args: UpdateCityArgs,
  context: Context
): Promise<City> => {
  authenticateUser({ admin: true }, context)

  const city: any = await context.database.cities.findOneAndUpdate(
    { _id: args._id },
    { ...args, updatedAt: new Date() }
  )

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_CITY,
    cityId: city._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return city
}
