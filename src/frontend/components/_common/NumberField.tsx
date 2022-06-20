import { ReactElement } from 'react'
import theme from '../../themes'
import { TextField } from '@mui/material'
import { formatProperCapitalization } from '../../_utils/formatProperCapitalization'

const NumberField = ({
  args,
  defaultValue,
  disabled,
  label,
  required,
  setArgs,
  targetProp,
  width
}: {
  args: any
  defaultValue?: number
  disabled?: boolean
  label?: string
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProp: string
  width?: number
}): ReactElement => {
  return (
    <TextField
      defaultValue={defaultValue}
      disabled={disabled}
      id='outlined-required'
      label={label || formatProperCapitalization(targetProp)}
      onChange={(e): void => {
        const val = Number(e.target.value)
        setArgs({ ...args, [targetProp]: val })
      }}
      placeholder={'0'}
      required={required}
      sx={{ width: width || 300, padding: theme.spacing(2), display: 'block' }}
      type={'number'}
      value={args[targetProp]}
      InputProps={{ inputProps: { min: 0 } }}
    />
  )
}

export default NumberField
