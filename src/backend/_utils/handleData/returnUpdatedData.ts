import { ObjectId } from 'mongodb'
import { Context } from '../../../types/setup/context'
import { MutateAction } from '../../_enums/mutateAction'
import { mutateArgs } from '../handleArgs/mutateArgs'

export const returnUpdatedData = async (
  context: Context,
  args: any,
  dbName: string
): Promise<any> => {
  const data: any = await context.database[dbName]
    .findOneAndUpdate(
      { _id: new ObjectId(args._id) },
      { $set: mutateArgs(args, MutateAction.UPDATE) },
      { returnDocument: 'after' }
    )
    .then((data) => data.value)

  return data
}
