import { ReactElement } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'
import { formatProperCapitalization } from '../../_utils/handleFormat/formatProperCapitalization'

const CheckboxField = ({
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
          onChange={(): void => {
            setArgs({ ...args, [targetProp]: !args?.[targetProp] })
          }}
        />
      }
      disabled={disabled}
      label={formatProperCapitalization(targetProp)}
    />
  )
}

export default CheckboxField
