import { ReactElement } from 'react'
import CustomFormLabel from './CustomFormLabel'
import { StyledTextField } from './StyledTextField'
import { returnError } from '../../_utils/handleArgs/returnError'
import { returnHelperText } from '../../_utils/handleArgs/returnHelperText'

const Text = ({
  args,
  disabled,
  error,
  maxLength,
  maxRows,
  multiline,
  nestedProp,
  placeholder,
  required,
  setArgs,
  targetProp
}: {
  args: any
  disabled?: boolean
  error?: boolean
  maxLength?: number
  maxRows?: number
  multiline?: boolean
  nestedProp?: string
  placeholder?: string
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProp: string
}): ReactElement => {
  const val = args?.[targetProp]

  return (
    <>
      <CustomFormLabel required={required} text={targetProp} />
      <StyledTextField
        disabled={disabled}
        error={returnError({ args, error, targetProp, nestedProp })}
        fullWidth
        helperText={returnHelperText({ args, error, targetProp, nestedProp })}
        inputProps={{ maxLength: maxLength || 150 }}
        maxRows={maxRows}
        multiline={multiline}
        onChange={(e): void => {
          if (nestedProp) {
            setArgs({
              ...args,
              [targetProp]: { ...val, [nestedProp]: e.target.value }
            })
          } else {
            setArgs({ ...args, [targetProp]: e.target.value })
          }
        }}
        placeholder={placeholder}
        required={required}
        size={'small'}
        value={nestedProp ? val?.[nestedProp] : val}
        variant={'outlined'}
      />
    </>
  )
}

export default Text
