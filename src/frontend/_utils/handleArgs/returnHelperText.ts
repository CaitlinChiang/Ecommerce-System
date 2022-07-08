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

  return ''
}
