import { ReactElement } from 'react'
import theme from '../../themes'
import { TextField } from '@mui/material'

const NumberField = ({
  defaultValue,
  disabled,
  label,
  required,
  setSpecificArgs,
  specificArgs,
  targetProperty,
  width
}: {
  defaultValue?: number
  disabled?: boolean
  label: string
  required?: boolean
  setSpecificArgs: React.Dispatch<React.SetStateAction<any>>
  specificArgs: any
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
        setSpecificArgs({ ...specificArgs, [targetProperty]: val })
      }}
      placeholder={'0'}
      required={required}
      sx={{ width: width || 300, padding: theme.spacing(2) }}
      type={'number'}
      value={specificArgs[targetProperty]}
      InputProps={{ inputProps: { min: 0 } }}
    />
  )
}

export default NumberField
