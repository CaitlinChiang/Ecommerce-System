import { Context } from 'types/context'
import { City, UpdateCityArgs } from 'types/City'
import { AuditLogAction } from 'types/_enums/auditLogAction'

export default async (
  _root: undefined,
  args: UpdateCityArgs,
  context: Context
): Promise<City> => {
  const { _id, name, shippingFee } = args

  const updateCity: Partial<UpdateCityArgs> = {
    name: name,
    shippingFee: shippingFee,
    updatedAt: new Date()
  }
  const city: any = await context.database.cities.findOneAndUpdate({ _id: _id }, updateCity)

  await context.database.auditLogs.insertOne({
    action: AuditLogAction.UPDATE_CITY,
    cityId: city._id,
    createdAt: new Date(),
    createdBy: context.currentUserId
  })

  return city
}
