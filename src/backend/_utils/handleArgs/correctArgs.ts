import { ObjectId } from 'mongodb'

export const correctArgs = (args: any, mutation?: boolean): void => {
  Object.keys(args).forEach((key: string): void => {
    const val = args[key]

    if (isValStringOrNull(val)) modifyArgs(key, args, mutation)

    if (isValObject(val) && val !== null) {
      modifyObjArgs(val, mutation)
      deleteEmptyObj(args, key)
    }

    if (isValArray(val) && val !== null) {
      modifyArrArgs(key, args, val, mutation)
    }
  })
}

const isValStringOrNull = (val: any): boolean => {
  if (typeof val === 'string' || val === null) return true
  return false
}
const isValObject = (val: any): boolean => {
  if (typeof val === 'object' && !Array.isArray(val)) return true
  return false
}
const isValArray = (val: any): boolean => {
  if (typeof val === 'object' && Array.isArray(val) && val?.length > 0) return true
  return false
}

const modifyObjArgs = (obj: any, mutation: boolean): void => {
  Object.keys(obj).forEach((key: string) => modifyArgs(key, obj, mutation))
}
const modifyArrArgs = (
  key: string,
  args: any,
  arr: any,
  mutation: boolean
): void => {
  arr.forEach((obj: any, index: number) => {
    if (typeof obj !== 'object') return

    modifyObjArgs(obj, mutation)
    deleteEmptyObj(args, key[index])
  })
}

const modifyArgs = (key: string, args: any, mutation: boolean): void => {
  const val = args[key]

  if (val === null) delete args[key]

  if (key.includes('Id') && val !== null) {
    args[key] = new ObjectId(args[key])
  }

  if (key.includes('Date') && val !== null && mutation) {
    args[key] = new Date(args[key])
  }
}

const deleteEmptyObj = (parentObj: any, childObj: any): void => {
  if (Object.keys(childObj)?.length === 0) {
    delete parentObj[childObj]
  }
}
