import { ReactElement } from 'react'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import CustomFormLabel from './CustomFormLabel'
import { returnError } from '../../_utils/handleArgs/returnError'
import { returnHelperText } from '../../_utils/handleArgs/returnHelperText'

const StyledNumberField = styled(TextField)`
  & .MuiOutlinedInput-input::-webkit-input-placeholder: {
    color: '#767e89',
    opacity: '1'
  },
  & .MuiOutlinedInput-notchedOutline: {
    borderColor: '#dee3e9'
  },
  & .MuiOutlinedInput-input.Mui-disabled: {
    backgroundColor: '#f8f9fb'
  },
  & .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder: {
    color: '#767e89',
    opacity: '1'
  }
`

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
      <StyledNumberField
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
