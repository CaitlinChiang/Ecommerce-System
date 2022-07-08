import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'

export const correctArgs = (args: any): any => {
  Object.keys(args).forEach((key: string) => {
    const val = args[key]

    if (typeof val === 'string') {
      modifyArgs(key, args)
    }

    if (key === 'email' && !isEmail(args?.email)) {
      args.email = null
    }

    if (key === 'phoneNumber' && !isMobilePhone(args?.phoneNumber)) {
      args.phoneNumber = null
    }
  })

  return args
}

const modifyArgs = (key: string, obj: any): any => {
  if (obj[key]?.trim().length === 0) {
    obj[key] = null
  }
}
