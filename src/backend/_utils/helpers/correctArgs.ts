import { ObjectId } from 'mongodb'

export const correctArgs = (modifiedArgs: any, mutation: boolean): any => {
  Object.keys(modifiedArgs).forEach((key: any) => {
    // LOGIC IF THE KEY IS AN OBJECT
    if (typeof key === 'object' && !Array.isArray(key) && key != null) {
      Object.keys(key).forEach((nestedKey: string) => {
        modifyArgs(nestedKey, key[nestedKey], mutation)
      })
    }

    // LOGIC IF THE KEY IS AN ARRAY
    if (Array.isArray(key) && key != null) {
      key.forEach((obj: any) => {
        Object.keys(obj).forEach((nestedKey: string) => {
          modifyArgs(nestedKey, obj[nestedKey], mutation)
        })
      })
    }

    // LOGIC IF THE KEY IS A STRING
    if (typeof key !== 'object') {
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
