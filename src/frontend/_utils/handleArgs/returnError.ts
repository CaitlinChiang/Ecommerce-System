import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'

export const returnError = ({
  args,
  error,
  nestedProp,
  targetProp
}: {
  args: any
  error: boolean
  nestedProp?: string
  targetProp: string
}): boolean => {
  let emptyArgs = !args?.[targetProp]

  if (nestedProp) {
    emptyArgs = !args?.[targetProp]?.[nestedProp]
  }

  if (error && emptyArgs) return true

  if (error && targetProp === 'email' && !isEmail(args?.email)) return true
  if (error && targetProp === 'phoneNumber' && !isMobilePhone(args?.phoneNumber)) {
    return true
  }

  return false
}
