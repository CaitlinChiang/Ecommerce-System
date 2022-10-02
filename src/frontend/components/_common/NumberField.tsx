import { ReactElement } from 'react'
import { StyledTextField } from './StyledTextField'
import CustomFormLabel from './CustomFormLabel'
import { returnError } from '../../_utils/handleArgs/returnError'
import { returnHelperText } from '../../_utils/handleArgs/returnHelperText'

const NumberField = ({
  args,
  disabled,
  error,
  fullWidth,
  label,
  nestedProp,
  required,
  setArgs,
  targetProp
}: {
  args: any
  disabled?: boolean
  error?: boolean
  fullWidth?: boolean
  label?: string
  nestedProp?: string
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProp: string
}): ReactElement => {
  const val = args[targetProp]

  return (
    <>
      <CustomFormLabel
        required={required}
        text={label || nestedProp || targetProp}
      />
      <StyledTextField
        disabled={disabled}
        error={returnError({ args, error, targetProp, nestedProp })}
        fullWidth={fullWidth}
        helperText={returnHelperText({ args, error, targetProp, nestedProp })}
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
        size={'small'}
        type={'number'}
        value={!nestedProp ? val : val?.[nestedProp]}
        variant={'outlined'}
        InputProps={{ inputProps: { min: 0 } }}
      />
    </>
  )
}

export default NumberField
