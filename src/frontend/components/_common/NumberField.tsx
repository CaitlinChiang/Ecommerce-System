import { ReactElement } from 'react'
import { textField } from '../../styles/_common/numberField'
import { TextField } from '@mui/material'
import { formatProperCapitalization } from '../../_utils/handleFormatting/formatProperCapitalization'
import { returnError } from '../../_utils/handleArgs/returnError'
import { returnHelperText } from '../../_utils/handleArgs/returnHelperText'

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
      error={returnError({ args, error, targetProp, nestedProp })}
      helperText={returnHelperText({ args, error, targetProp, nestedProp })}
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
      sx={{ ...textField, width: width || 300 }}
      type={'number'}
      value={!nestedProp ? args[targetProp] : args[targetProp]?.[nestedProp]}
      InputProps={{ inputProps: { min: 0 } }}
    />
  )
}

export default NumberField
