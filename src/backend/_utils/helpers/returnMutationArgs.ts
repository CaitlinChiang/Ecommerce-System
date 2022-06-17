import { MutateAction } from '../../../types/_enums/mutateAction'

export const mutationArgs = (args: any, action: MutateAction): any => {
  const modifiedArgs: any = { ...args }

  switch (action) {
    case MutateAction.CREATE:
      modifiedArgs.createdAt = new Date()
      break
    case MutateAction.UPDATE:
      modifiedArgs.updatedAt = new Date()
      break
  }

  return modifiedArgs
}
