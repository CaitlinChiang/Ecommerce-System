import { ObjectId } from 'mongodb'

export const correctArgs = ({
  args,
  mutation
}: {
  args: any
  mutation?: boolean
}): void => {
  Object.keys(args).forEach((key: string): void => {
    const val = args[key]

    if (isValueStringOrNull(val)) modifyArgs(key, args, mutation)

    if (isValueObject(val) && val !== null) {
      modifyObjArgs(val, mutation)
      deleteObj(args, key)
    }

    if (isValueArray(val) && val !== null) {
      val.forEach((e: any, index: number) => {
        if (typeof e === 'object') {
          modifyObjArgs(e, mutation)
          deleteObj(args, key[index])
        }
      })
    }
  })
}

const isValueStringOrNull = (val: any): boolean => {
  if (typeof val === 'string' || val === null) return true
  return false
}

const isValueObject = (val: any): boolean => {
  if (typeof val === 'object' && !Array.isArray(val)) return true
  return false
}

const isValueArray = (val: any): boolean => {
  if (typeof val === 'object' && Array.isArray(val) && val?.length > 0) return true
  return false
}

const modifyObjArgs = (e: any, mutation: boolean): void => {
  Object.keys(e).forEach((k: string) => modifyArgs(k, e, mutation))
}

const modifyArgs = (key: string, obj: any, mutation: boolean): void => {
  if (obj[key] === null) {
    delete obj[key]
  }

  if (key.includes('Id') && obj[key] !== null) {
    obj[key] = new ObjectId(obj[key])
  }

  if (key.includes('Date') && obj[key] !== null && mutation) {
    obj[key] = new Date(obj[key])
  }
}

const deleteObj = (mainObj: any, currentObj: any): void => {
  if (Object.keys(currentObj)?.length === 0) {
    delete mainObj[currentObj]
  }
}
