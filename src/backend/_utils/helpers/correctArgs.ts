import { ObjectId } from 'mongodb'

export const correctArgs = (modifiedArgs: any): any => {
  Object.keys(modifiedArgs).forEach((key) => {
    if (modifiedArgs[key] != null && String(key).includes('Id')) {
      modifiedArgs[key] = new ObjectId(modifiedArgs[key])
    }

    if (modifiedArgs[key] === null) {
      delete modifiedArgs[key]
    }
  })
}
