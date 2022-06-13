import { ReactElement } from 'react'
import { TextField, Autocomplete } from '@mui/material'

const SelectField = ({
  label,
  setValue,
  value,
  options,
  width
}: {
  label: string
  options: any
  setValue: React.Dispatch<React.SetStateAction<string>>
  value: string
  width?: number
}): ReactElement => {
  return (
    <Autocomplete
      getOptionLabel={(option): string => option}
      onChange={(_e: any, newValue: string | null) => {
        setValue(newValue)
      }}
      options={options}
      renderInput={(params): ReactElement => <TextField {...params} label={label} />}
      sx={{ width: width || 300 }}
      value={value}
    />
  )
}

export default SelectField
