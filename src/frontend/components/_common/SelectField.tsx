import { ReactElement } from 'react'
import theme from '../../themes'
import { TextField, Autocomplete } from '@mui/material'

const SelectField = ({
  args,
  defaultValue,
  label,
  multiple,
  optionLabelProperty,
  options,
  required,
  setArgs,
  targetProperty,
  width
}: {
  args: any
  defaultValue?: any
  label: string
  multiple?: boolean
  optionLabelProperty?: string
  options: any[]
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProperty: string
  width?: number
}): ReactElement => {
  return (
    <Autocomplete
      defaultValue={defaultValue}
      getOptionLabel={(option: any): string => option[optionLabelProperty]}
      multiple={multiple}
      onChange={(_e: any, newValue: any | null) => {
        let val = newValue?.[targetProperty]

        if (multiple) {
          val = newValue.map((option: any) => option?.[targetProperty])
        }

        setArgs({ ...args, [targetProperty]: val })
      }}
      options={options}
      renderInput={(params): ReactElement => (
        <TextField {...params} label={label} required={required} />
      )}
      sx={{ width: width || 300, padding: theme.spacing(2) }}
      value={args[optionLabelProperty]}
    />
  )
}

export default SelectField
