import { ReactElement } from 'react'
import theme from '../../themes'
import { TextField, Autocomplete } from '@mui/material'

const SelectField = ({
  args,
  defaultValue,
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
  defaultValue?: any
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
      defaultValue={defaultValue}
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
      value={selectVal ? selectVal : args[targetProp]}
    />
  )
}

export default SelectField
