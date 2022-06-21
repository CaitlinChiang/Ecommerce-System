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
      label={label || formatProperCapitalization(targetProp)}
      onChange={(e): void => {
        setArgs({ ...args, [targetProp]: e.target.value })
      }}
      placeholder={targetProp == 'price' ? '0.00' : '0'}
      required={required}
      sx={{ width: width || 300, padding: theme.spacing(2), display: 'block' }}
      type={'number'}
      value={args[targetProp]}
      InputProps={{ inputProps: { min: 0 } }}
    />
  )
}

export default NumberField
