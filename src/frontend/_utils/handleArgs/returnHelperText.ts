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
  if (error && !args?.[targetProp]) {
    const fieldName = formatText(nestedProp)

    if (nestedProp) {
      return `${fieldName} is a required field.`
    }
    return `${fieldName} is a required field.`
  }

  if (error && targetProp === 'email' && !isEmail(args?.email)) {
    return 'Please enter valid email.'
  }

  if (error && targetProp === 'phoneNumber' && !isMobilePhone(args?.phoneNumber)) {
    return 'Please enter valid phone number.'
  }

  return ''
}
