import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { City, CreateCityArgs } from '../../../../types/city'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: CreateCityArgs,
  context: Context
): Promise<City> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.CREATE_CITY,
    context
  })

  const cityId: ObjectId = await context.database.cities
    .insertOne(mutateArgs(args, MutateAction.CREATE))
    .then((city) => city.insertedId)

  await createAuditLog(AuditLogAction.CREATE_CITY, context)

  return { _id: cityId, ...args }
}
