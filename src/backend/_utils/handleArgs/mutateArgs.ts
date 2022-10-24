import { Context } from '../../../types/setup/context'
import { MutateAction } from '../../_enums/mutateAction'
import { currentDateTime } from '../handleFormat/returnCurrentDateTime'
import { correctArgs } from './correctArgs'

export const mutateArgs = (
  context: Context,
  args: any,
  action: MutateAction
): any => {
  let mutateArgs: any = {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...updateArgs } = args

  switch (action) {
    case MutateAction.CREATE:
      mutateArgs = {
        ...args,
        createdAt: currentDateTime(),
        createdBy: context.userId
      }
      break
    case MutateAction.UPDATE:
      mutateArgs = {
        ...updateArgs,
        updatedAt: currentDateTime(),
        updatedBy: context.userId
      }
      break
    case MutateAction.DELETE:
      mutateArgs = { deletedAt: currentDateTime(), deletedBy: context.userId }
  }

  correctArgs(mutateArgs, true)

  return mutateArgs
}
