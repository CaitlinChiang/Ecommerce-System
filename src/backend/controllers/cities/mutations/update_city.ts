import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { City, UpdateCityArgs } from '../../../../types/City'
import { AdminPermission } from '../../../_enums/adminPermission'
import { MutateAction } from '../../../_enums/mutateAction'
import { AuditLogAction } from '../../../_enums/auditLogAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'
import { createAuditLog } from '../../../_utils/handleData/createAuditLog'

export default async (
  _root: undefined,
  args: UpdateCityArgs,
  context: Context
): Promise<City> => {
  await authenticateUser({
    admin: true,
    permission: AdminPermission.UPDATE_CITY,
    context
  })

  const city: City = await context.database.cities
    .findOneAndUpdate(
      { _id: new ObjectId(args._id) },
      { $set: mutateArgs(args, MutateAction.UPDATE) },
      { returnDocument: 'after' }
    )
    .then((city) => city.value)

  await createAuditLog(AuditLogAction.UPDATE_CITY, context)

  return city
}
