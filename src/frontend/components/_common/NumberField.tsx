import { ReactElement } from 'react'
import theme from '../../themes'
import { TextField } from '@mui/material'
import { formatProperCapitalization } from '../../_utils/handleFormatting/formatProperCapitalization'

const NumberField = ({
  args,
  disabled,
  error,
  label,
  nestedProp,
  required,
  setArgs,
  targetProp,
  width
}: {
  args: any
  disabled?: boolean
  error?: boolean
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
      error={
        error &&
        (nestedProp ? !args?.[targetProp]?.[nestedProp] : !args?.[targetProp])
      }
      helperText={
        error &&
        formatProperCapitalization(nestedProp || targetProp) +
          ' is a required field.'
      }
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
      placeholder={'0'}
      required={required}
      sx={{ width: width || 300, padding: theme.spacing(2), display: 'block' }}
      type={'number'}
      value={!nestedProp ? args[targetProp] : args[targetProp]?.[nestedProp]}
      InputProps={{ inputProps: { min: 0 } }}
    />
  )
}

export default NumberField
