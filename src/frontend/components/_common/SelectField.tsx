import { ReactElement } from 'react'
import theme from '../../themes'
import { TextField, Autocomplete } from '@mui/material'

const SelectField = ({
  args,
  disabled,
  label,
  multiple,
  optionLabelProp,
  options,
  required,
  selectVal,
  setArgs,
  targetProp,
  width
}: {
  args: any
  disabled?: boolean
  label: string
  multiple?: boolean
  optionLabelProp?: string
  options: any[]
  required?: boolean
  selectVal?: any
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProp: string
  width?: number
}): ReactElement => {
  return (
    <Autocomplete
      disabled={disabled}
      getOptionLabel={(option: any): string => option[optionLabelProp]}
      multiple={multiple}
      onChange={(_e: any, newValue: any | null) => {
        let val = newValue?.[targetProp]

        if (multiple) {
          val = newValue.map((option: any) => option?.[targetProp])
        }

        setArgs({ ...args, [targetProp]: val })
      }}
      options={options}
      renderInput={(params): ReactElement => (
        <TextField {...params} label={label} required={required} />
      )}
      sx={{ width: width || 300, padding: theme.spacing(2), display: 'block' }}
      value={selectVal !== null ? selectVal : args[targetProp]}
    />
  )
}

export default SelectField
