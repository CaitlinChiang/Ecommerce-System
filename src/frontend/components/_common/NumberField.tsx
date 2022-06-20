import { ReactElement } from 'react'
import theme from '../../themes'
import { TextField } from '@mui/material'

const NumberField = ({
  args,
  defaultValue,
  disabled,
  label,
  required,
  setArgs,
  targetProperty,
  width
}: {
  args: any
  defaultValue?: number
  disabled?: boolean
  label: string
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProperty: string
  width?: number
}): ReactElement => {
  return (
    <TextField
      defaultValue={defaultValue}
      disabled={disabled}
      id='outlined-required'
      label={label}
      onChange={(e): void => {
        const val = Number(e.target.value)
        setArgs({ ...args, [targetProperty]: val })
      }}
      placeholder={'0'}
      required={required}
      sx={{ width: width || 300, padding: theme.spacing(2) }}
      type={'number'}
      value={args[targetProperty]}
      InputProps={{ inputProps: { min: 0 } }}
    />
  )
}

export default NumberField
