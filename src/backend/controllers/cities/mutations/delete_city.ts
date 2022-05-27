import { Context } from 'types/context'
import { City, DeleteCityArgs } from 'types/City'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: DeleteCityArgs,
  context: Context
): Promise<City> => {
  const { _id } = args

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.DELETE_CITY,
    cityId: _id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  const city: any = await context.database.cities.findOneAndDelete({ _id: _id })
  
  return city
}
