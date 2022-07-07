import { ReactElement } from 'react'
import theme from '../../themes'
import { TextField } from '@mui/material'
import { formatProperCapitalization } from '../../_utils/formatProperCapitalization'

const NumberField = ({
  args,
  disabled,
  label,
  nestedProp,
  required,
  setArgs,
  targetProp,
  width
}: {
  args: any
  disabled?: boolean
  label?: string
  nestedProp?: string
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProp: string
  width?: number
}): ReactElement => {
  return (
    <TextField
      disabled={disabled}
      label={label || formatProperCapitalization(nestedProp || targetProp)}
      onChange={(e): void => {
        if (!nestedProp) setArgs({ ...args, [targetProp]: e.target.value })

        if (nestedProp) {
          setArgs({
            ...args,
            [targetProp]: { ...args[targetProp], [nestedProp]: e.target.value }
          })
        }
      }}
      placeholder={targetProp === 'price' || nestedProp === 'price' ? '0.00' : '0'}
      required={required}
      sx={{ width: width || 300, padding: theme.spacing(2), display: 'block' }}
      type={'number'}
      value={args[targetProp] || args[targetProp][nestedProp]}
      InputProps={{ inputProps: { min: 0 } }}
    />
  )
}

export default NumberField
