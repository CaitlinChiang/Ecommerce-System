import { ReactElement } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'
import { formatProperCapitalization } from '../../_utils/formatProperCapitalization'

const DatePickerField = ({
  args,
  disabled,
  setArgs,
  targetProperty
}: {
  args: any
  disabled?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProperty: string
}): ReactElement => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={args?.[targetProperty]}
          onChange={() =>
            setArgs({ ...args, [targetProperty]: !args?.[targetProperty] })
          }
        />
      }
      disabled={disabled}
      label={formatProperCapitalization(targetProperty)}
    />
  )
}

export default DatePickerField
