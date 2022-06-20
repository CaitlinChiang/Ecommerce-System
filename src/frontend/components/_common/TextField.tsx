import { ReactElement } from 'react'
import theme from '../../themes'
import { TextField } from '@mui/material'

const Text = ({
  defaultValue,
  disabled,
  error,
  helperText,
  label,
  maxRows,
  multiline,
  placeholder,
  required,
  setValue,
  value,
  width
}: {
  defaultValue?: string
  disabled?: boolean
  error?: any
  helperText?: string
  label: string
  maxRows?: number
  multiline?: boolean
  placeholder?: string
  required?: boolean
  setValue: React.Dispatch<React.SetStateAction<string>>
  value: string
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
        setValue(e.target.value)
      }}
      placeholder={placeholder}
      required={required}
      sx={{ width: width || 300, padding: theme.spacing(2) }}
      value={value}
    />
  )
}

export default Text
