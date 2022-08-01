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
  if (!error) return false

  const val = args?.[targetProp]

  let emptyArgs = !val

  if (nestedProp) {
    emptyArgs = !val?.[nestedProp]
  }

  if (emptyArgs) return true

  if (targetProp === 'email' && !isEmail(args?.email)) return true

  if (targetProp === 'password' && args?.password?.length < 8) return true

  if (targetProp === 'phoneNumber' && !isMobilePhone(args?.phoneNumber)) {
    return true
  }

  return false
}
