import { ReactElement } from 'react'
import theme from '../../themes'
import { TextField, Autocomplete } from '@mui/material'

const SelectField = ({
  defaultValue,
  label,
  multiple,
  optionLabelProperty,
  options,
  required,
  setSpecificArgs,
  specificArgs,
  targetProperty,
  width
}: {
  defaultValue?: any
  label: string
  multiple?: boolean
  optionLabelProperty?: string
  options: any[]
  required?: boolean
  setSpecificArgs: React.Dispatch<React.SetStateAction<any>>
  specificArgs: any
  targetProperty: string
  width?: number
}): ReactElement => {
  return (
    <Autocomplete
      defaultValue={defaultValue}
      getOptionLabel={(option: any): string => option[optionLabelProperty]}
      multiple={multiple}
      onChange={(_e: any, newValue: any | null) => {
        const val = newValue?.[targetProperty]
        setSpecificArgs({ ...specificArgs, [targetProperty]: val })
      }}
      options={options}
      renderInput={(params): ReactElement => (
        <TextField {...params} label={label} required={required} />
      )}
      sx={{ width: width || 300, padding: theme.spacing(2) }}
      value={specificArgs[optionLabelProperty]}
    />
  )
}

export default SelectField
