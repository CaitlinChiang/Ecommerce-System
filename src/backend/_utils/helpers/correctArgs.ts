import { ObjectId } from 'mongodb'

export const correctArgs = (modifiedArgs: any, mutation: boolean): any => {
  Object.keys(modifiedArgs).forEach((key: string) => {
    // KEY VALUE IS AN OBJECT
    if (
      typeof modifiedArgs[key] === 'object' &&
      !Array.isArray(modifiedArgs[key]) &&
      modifiedArgs[key] != null
    ) {
      Object.keys(modifiedArgs[key]).forEach((nestedKey: string) => {
        modifyArgs(nestedKey, modifiedArgs[key], mutation)
      })
    }

    // KEY VALUE IS AN ARRAY
    if (
      typeof modifiedArgs[key] === 'object' &&
      Array.isArray(modifiedArgs[key]) &&
      modifiedArgs[key] != null
    ) {
      modifiedArgs[key].forEach((item: any) => {
        Object.keys(item).forEach((nestedKey: string) => {
          modifyArgs(nestedKey, item, mutation)
        })
      })
    }

    // KEY VALUE IS A STRING
    if (typeof modifiedArgs[key] === 'string') {
      modifyArgs(key, modifiedArgs, mutation)
    }
  })
}

const modifyArgs = (key: string, modifiedArgs: any, mutation: boolean): any => {
  if (modifiedArgs[key] === null) {
    delete modifiedArgs[key]
  }

  if (key.includes('Id') && modifiedArgs[key] != null) {
    modifiedArgs[key] = new ObjectId(modifiedArgs[key])
  }

  if (key.includes('Date') && mutation && modifiedArgs[key] != null) {
    modifiedArgs[key] = new Date(modifiedArgs[key])
  }
}
