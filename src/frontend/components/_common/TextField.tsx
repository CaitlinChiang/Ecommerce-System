import { ReactElement } from 'react'
import styles from '../../styles/_common/textField'
import { TextField } from '@mui/material'
import { formatText } from '../../_utils/handleFormat/formatText'
import { returnError } from '../../_utils/handleArgs/returnError'
import { returnHelperText } from '../../_utils/handleArgs/returnHelperText'

const Text = ({
  args,
  disabled,
  error,
  fullWidth,
  maxLength,
  maxRows,
  multiline,
  nestedProp,
  placeholder,
  required,
  setArgs,
  targetProp,
  width
}: {
  args: any
  disabled?: boolean
  error?: boolean
  fullWidth?: boolean
  maxLength?: number
  maxRows?: number
  multiline?: boolean
  nestedProp?: string
  placeholder?: string
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProp: string
  width?: number
}): ReactElement => {
  const val = args?.[targetProp]

  return (
    <TextField
      disabled={disabled}
      error={returnError({ args, error, targetProp, nestedProp })}
      fullWidth={fullWidth}
      helperText={returnHelperText({ args, error, targetProp, nestedProp })}
      inputProps={{ maxLength: maxLength || 150 }}
      label={formatText(targetProp)}
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
      sx={{ ...styles.textField, width: width || 500 }}
      value={nestedProp ? val?.[nestedProp] : val}
    />
  )
}

export default Text
