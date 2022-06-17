import { MutateAction } from '../../_enums/mutateAction'
import { currentDateTime } from './returnCurrentDateTime'

export const mutationArgs = (args: any, action: MutateAction): any => {
  const modifiedArgs: any = { ...args }

  switch (action) {
    case MutateAction.CREATE:
      modifiedArgs.createdAt = currentDateTime()
      break
    case MutateAction.UPDATE:
      modifiedArgs.updatedAt = currentDateTime()
      break
  }

  return modifiedArgs
}
