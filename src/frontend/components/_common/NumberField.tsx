import { ReactElement } from 'react'
import styles from '../../styles/_common/numberField'
import { TextField } from '@mui/material'
import { formatText } from '../../_utils/handleFormat/formatText'
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
  const val = args[targetProp]

  return (
    <TextField
      disabled={disabled}
      error={returnError({ args, error, targetProp, nestedProp })}
      helperText={returnHelperText({ args, error, targetProp, nestedProp })}
      label={label || formatText(nestedProp || targetProp)}
      onChange={(e): void => {
        const inputVal = e.target.value

        if (nestedProp) {
          setArgs({ ...args, [targetProp]: { ...[val], [nestedProp]: inputVal } })
        } else {
          setArgs({ ...args, [targetProp]: inputVal })
        }
      }}
      placeholder={'0'}
      required={required}
      sx={{ ...styles.textField, width: width || 300 }}
      type={'number'}
      value={!nestedProp ? val : val?.[nestedProp]}
      InputProps={{ inputProps: { min: 0 } }}
    />
  )
}

export default NumberField
