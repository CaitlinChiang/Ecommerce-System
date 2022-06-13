import { ReactElement } from 'react'
import { TextField, Autocomplete } from '@mui/material'

const SelectField = ({
  defaultValue,
  label,
  optionLabel,
  options,
  required,
  setValue,
  targetProperty,
  value,
  width
}: {
  defaultValue?: any
  label: string
  options: any
  optionLabel?: string
  required?: boolean
  setValue: React.Dispatch<React.SetStateAction<string>>
  targetProperty?: string
  value: any
  width?: number
}): ReactElement => {
  return (
    <Autocomplete
      defaultValue={defaultValue}
      getOptionLabel={(option): string =>
        optionLabel ? option[optionLabel] : option
      }
      onChange={(_e: any, newValue: any | null) => {
        const val = targetProperty ? newValue[targetProperty] : newValue
        setValue(val)
      }}
      options={options}
      renderInput={(params): ReactElement => (
        <TextField {...params} label={label} required={required} />
      )}
      sx={{ width: width || 300 }}
      value={value}
    />
  )
}

export default SelectField
