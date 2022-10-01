import { ObjectId } from 'mongodb'
import { Context } from '../../../types/setup/context'

export const deleteData = async (
  context: Context,
  args: any,
  dbName: string
): Promise<void> => {
  await context.database[dbName].findOneAndDelete({ _id: new ObjectId(args._id) })
}
