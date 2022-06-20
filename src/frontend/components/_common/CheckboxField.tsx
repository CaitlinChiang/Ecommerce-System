import { ReactElement } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'
import { formatProperCapitalization } from '../../_utils/formatProperCapitalization'

const DatePickerField = ({
  args,
  disabled,
  setArgs,
  targetProp
}: {
  args: any
  disabled?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProp: string
}): ReactElement => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={args?.[targetProp]}
          onChange={() => setArgs({ ...args, [targetProp]: !args?.[targetProp] })}
        />
      }
      disabled={disabled}
      label={formatProperCapitalization(targetProp)}
    />
  )
}

export default DatePickerField
