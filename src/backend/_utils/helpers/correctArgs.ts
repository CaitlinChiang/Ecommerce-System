import { ObjectId } from 'mongodb'

export const correctArgs = (modifiedArgs: any, mutation: boolean): any => {
  Object.keys(modifiedArgs).forEach((key) => {
    if (modifiedArgs[key] === null) {
      delete modifiedArgs[key]
    }

    if (modifiedArgs[key] != null && String(key).includes('Id')) {
      modifiedArgs[key] = new ObjectId(modifiedArgs[key])
    }

    if (mutation && modifiedArgs[key] != null && String(key).includes('Date')) {
      modifiedArgs[key] = new Date(modifiedArgs[key])
    }
  })
}
