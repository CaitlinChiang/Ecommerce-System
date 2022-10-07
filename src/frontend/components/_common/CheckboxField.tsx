import { ReactElement } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'
import { formatText } from '../../_utils/handleFormat/formatText'

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
  const val = args?.[targetProp]

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={val}
          onChange={(): void => setArgs({ ...args, [targetProp]: !val })}
        />
      }
      disabled={disabled}
      label={formatText(targetProp)}
      sx={{ marginTop: 2.5 }}
    />
  )
}

export default CheckboxField
