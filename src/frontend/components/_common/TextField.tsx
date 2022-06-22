import { ReactElement } from 'react'
import theme from '../../themes'
import { TextField } from '@mui/material'
import { formatProperCapitalization } from '../../_utils/formatProperCapitalization'

const Text = ({
  args,
  defaultValue,
  disabled,
  error,
  fullWidth,
  helperText,
  label,
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
  defaultValue?: string
  disabled?: boolean
  error?: any
  fullWidth?: boolean
  helperText?: string
  label?: string
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
      defaultValue={defaultValue}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      helperText={error && helperText}
      inputProps={{ maxLength: maxLength || 150 }}
      label={label || formatProperCapitalization(targetProp)}
      maxRows={maxRows}
      multiline={multiline}
      onChange={(e): void => {
        setArgs({ ...args, [targetProp]: e.target.value })
      }}
      placeholder={placeholder}
      required={required}
      sx={{ width: width || 500, padding: theme.spacing(2), display: 'block' }}
      value={args[targetProp]}
    />
  )
}

export default Text
