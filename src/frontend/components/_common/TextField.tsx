import { ReactElement } from 'react'
import theme from '../../themes'
import { TextField } from '@mui/material'

const Text = ({
  args,
  defaultValue,
  disabled,
  error,
  helperText,
  label,
  maxRows,
  multiline,
  placeholder,
  required,
  setArgs,
  targetProperty,
  width
}: {
  args: any
  defaultValue?: string
  disabled?: boolean
  error?: any
  helperText?: string
  label: string
  maxRows?: number
  multiline?: boolean
  placeholder?: string
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProperty: string
  width?: number
}): ReactElement => {
  return (
    <TextField
      defaultValue={defaultValue}
      disabled={disabled}
      error={error}
      helperText={error && helperText}
      id='outlined-required'
      label={label}
      maxRows={maxRows}
      multiline={multiline}
      onChange={(e): void => {
        setArgs({ ...args, [targetProperty]: e.target.value })
      }}
      placeholder={placeholder}
      required={required}
      sx={{ width: width || 300, padding: theme.spacing(2) }}
      value={args[targetProperty]}
    />
  )
}

export default Text
