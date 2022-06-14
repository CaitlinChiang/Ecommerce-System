import { ReactElement } from 'react'
import { TextField, Autocomplete } from '@mui/material'

const SelectField = ({
  defaultValue,
  label,
  optionLabelProperty,
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
  optionLabelProperty?: string
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
        optionLabelProperty ? option[optionLabelProperty] : option
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
