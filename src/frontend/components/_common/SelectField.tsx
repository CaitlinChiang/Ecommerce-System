import { ReactElement } from 'react'
import { TextField, Autocomplete } from '@mui/material'

const SelectField = ({
  defaultValue,
  label,
  optionLabel,
  options,
  setValue,
  targetProperty,
  value,
  width
}: {
  defaultValue?: any
  label: string
  options: any
  optionLabel?: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  targetProperty?: string
  value: string
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
      renderInput={(params): ReactElement => <TextField {...params} label={label} />}
      sx={{ width: width || 300 }}
      value={value}
    />
  )
}

export default SelectField
