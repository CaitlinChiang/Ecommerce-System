import { ReactElement } from 'react'
import { TextField } from '@mui/material'

const Text = ({
  defaultValue,
  label,
  maxRows,
  multiline,
  placeholder,
  required,
  setValue,
  value
}: {
  defaultValue?: string
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
