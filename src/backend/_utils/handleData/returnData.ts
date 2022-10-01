import { ObjectId } from 'mongodb'
import { Context } from '../../../types/setup/context'

export const returnData = async (
  context: Context,
  args: any,
  dbName: string
): Promise<any> => {
  const data: any = await context.database[dbName].findOne({
    _id: new ObjectId(args._id)
  })

  return data
}
