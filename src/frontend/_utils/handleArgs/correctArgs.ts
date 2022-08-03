import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'

export const correctArgs = (args: any): any => {
  Object.keys(args).forEach((key: string): void => {
    const val = args[key]

    if (typeof val === 'string') modifyArgs(args, key)

    if (typeof val === 'object' && !Array.isArray(val)) {
      Object.keys(val).forEach((k: string) => modifyArgs(val, k))
    }

    if (['email', 'password', 'phoneNumber'].includes(key)) {
      validateArgs(args)
    }
  })

  return args
}

const modifyArgs = (args: any, key: string): any => {
  if (args[key]?.trim().length === 0) {
    args[key] = null
  }
}

const validateArgs = (args: any): any => {
  const { email, password, phoneNumber } = args

  if (email && !isEmail(email)) {
    args.email = null
  }

  if (password && password?.length < 8) {
    args.password = null
  }

  if (phoneNumber && !isMobilePhone(phoneNumber)) {
    args.phoneNumber = null
  }

  return args
}
