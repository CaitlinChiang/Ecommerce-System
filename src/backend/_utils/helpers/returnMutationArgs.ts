import { ObjectId } from 'mongodb'
import { MutateAction } from '../../_enums/mutateAction'
import { currentDateTime } from './returnCurrentDateTime'

export const mutationArgs = (args: any, action: MutateAction): any => {
  let modifiedArgs: any = {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...updateArgs } = args

  switch (action) {
    case MutateAction.CREATE:
      modifiedArgs = { ...args, createdAt: currentDateTime() }
      break
    case MutateAction.UPDATE:
      modifiedArgs = { ...updateArgs, updatedAt: currentDateTime() }
      break
    case MutateAction.DELETE:
      modifiedArgs = { deletedAt: currentDateTime() }
      break
  }

  Object.keys(modifiedArgs).forEach((key) => {
    if (modifiedArgs[key] != null && String(key).includes('Id')) {
      modifiedArgs[key] = new ObjectId(modifiedArgs[key])
    }

    if (modifiedArgs[key] === null) {
      delete modifiedArgs[key]
    }
  })

  return modifiedArgs
}
