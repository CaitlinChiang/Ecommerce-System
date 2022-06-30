import { ObjectId } from 'mongodb'

export const correctArgs = (modifiedArgs: any, mutation: boolean): any => {
  Object.keys(modifiedArgs).forEach((key: string) => {
    const val = modifiedArgs[key]

    if (isValueObject(val)) {
      Object.keys(val).forEach((nestedKey: string) => {
        modifyArgs(nestedKey, val, mutation)
      })
    }

    if (isValueArray(val)) {
      val.forEach((item: any) => {
        Object.keys(item).forEach((nestedKey: string) =>
          modifyArgs(nestedKey, item, mutation)
        )
      })
    }

    if (isValueString(val)) {
      modifyArgs(key, modifiedArgs, mutation)
    }
  })
}

const isValueObject = (val: any) => {
  if (typeof val === 'object' && !Array.isArray(val) && val != null) return true
  return false
}

const isValueArray = (val: any) => {
  if (typeof val === 'object' && Array.isArray(val) && val != null) return true
  return false
}

const isValueString = (val: any) => {
  if (typeof val === 'string' || val === null) return true
  return false
}

const modifyArgs = (key: string, obj: any, mutation: boolean): any => {
  if (obj[key] === null) {
    delete obj[key]
  }

  if (key.includes('Id') && obj[key] != null) {
    obj[key] = new ObjectId(obj[key])
  }

  if (key.includes('Date') && mutation && obj[key] != null) {
    obj[key] = new Date(obj[key])
  }
}
