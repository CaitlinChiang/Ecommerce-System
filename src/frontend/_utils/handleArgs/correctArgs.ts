import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'

export const correctArgs = ({
  args,
  requiredArgs
}: {
  args: any
  requiredArgs?: string[]
}): any => {
  Object.keys(args).forEach((key: string): void => {
    if (typeof args[key] === 'string') modifyArgs(args, key)

    if (requiredArgs.includes(key)) {
      checkField({ args, key })
    }
  })

  return args
}

const modifyArgs = (args: any, key: string): any => {
  if (args[key]?.trim().length === 0) {
    args[key] = null
  }
}

export const checkField = ({
  args,
  key,
  required
}: {
  args: any
  key: string
  required?: string
}): any => {
  const requiredArg: string = required || '_id'

  if (key === 'email' || key === 'password' || key === 'phoneNumber') {
    validateArgs({ [key]: args?.[key] })
  }

  if (!args?.[key]) {
    args[requiredArg] = null
  }

  return args
}

export const validateArgs = (args: any): any => {
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
