import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'
import { formatText } from '../handleFormat/formatText'

export const returnHelperText = ({
  args,
  error,
  nestedProp,
  targetProp
}: {
  args: any
  error: boolean
  nestedProp?: string
  targetProp: string
}): string => {
  if (!error) return ''

  if (targetProp === 'email' && !isEmail(args?.email)) {
    return 'Please enter valid email.'
  }

  if (targetProp === 'password' && args?.password?.length < 8) {
    return 'Password must be at least 8 characters long.'
  }

  if (targetProp === 'phoneNumber' && !isMobilePhone(args?.phoneNumber)) {
    return 'Please enter valid phone number.'
  }

  if (!args?.[targetProp]) {
    const fieldName = formatText(nestedProp || targetProp)
    return `${fieldName} is a required field.`
  }

  return ''
}
