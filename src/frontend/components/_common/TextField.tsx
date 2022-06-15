import { ReactElement } from 'react'
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
  value
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
      value={value}
      required={required}
    />
  )
}

export default Text
