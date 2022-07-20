import { MutateAction } from '../../_enums/mutateAction'
import { currentDateTime } from '../handleDates/returnCurrentDateTime'
import { correctArgs } from './correctArgs'

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
  }

  correctArgs({ args: modifiedArgs, mutation: true })

  return modifiedArgs
}
