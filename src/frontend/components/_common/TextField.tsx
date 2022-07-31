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
  placeholder?: string
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProp: string
  width?: number
}): ReactElement => {
  return (
    <TextField
      disabled={disabled}
      error={returnError({ args, error, targetProp })}
      fullWidth={fullWidth}
      helperText={returnHelperText({ args, error, targetProp })}
      inputProps={{ maxLength: maxLength || 150 }}
      label={formatText(targetProp)}
      maxRows={maxRows}
      multiline={multiline}
      onChange={(e): void => setArgs({ ...args, [targetProp]: e.target.value })}
      placeholder={placeholder}
      required={required}
      sx={{ ...styles.textField, width: width || 500 }}
      value={args?.[targetProp]}
    />
  )
}

export default Text
