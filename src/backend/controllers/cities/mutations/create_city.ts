import { Context } from 'types/context'
import { City, CreateCityArgs } from 'types/city'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: CreateCityArgs,
  context: Context
): Promise<City> => {
  const { name, shippingFee } = args

  const createCity: CreateCityArgs = {
    name: name, 
    shippingFee: shippingFee,
    createdAt: new Date()
  }
  const city: any = await context.database.cities.insertOne(createCity)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.CREATE_CITY,
    cityId: city._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return city
}
