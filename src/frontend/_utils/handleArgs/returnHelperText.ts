import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'
import { formatProperCapitalization } from '../handleFormatting/formatProperCapitalization'

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
    if (nestedProp) {
      return formatProperCapitalization(nestedProp) + ' is a required field.'
    }
    return formatProperCapitalization(targetProp) + ' is a required field.'
  }

  if (error && targetProp === 'email' && !isEmail(args?.email)) {
    return 'Please enter valid email.'
  }

  if (error && targetProp === 'phoneNumber' && !isMobilePhone(args?.phoneNumber)) {
    return 'Please enter valid phone number.'
  }

  return ''
}
