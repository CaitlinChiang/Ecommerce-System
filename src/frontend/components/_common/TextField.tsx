import { ReactElement } from 'react'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import CustomFormLabel from './CustomFormLabel'
import { returnError } from '../../_utils/handleArgs/returnError'
import { returnHelperText } from '../../_utils/handleArgs/returnHelperText'

const StyledTextField = styled(TextField)`
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

const Text = ({
  args,
  disabled,
  error,
  fullWidth,
  maxLength,
  maxRows,
  multiline,
  nestedProp,
  placeholder,
  required,
  setArgs,
  targetProp
}: {
  args: any
  disabled?: boolean
  error?: boolean
  fullWidth?: boolean
  maxLength?: number
  maxRows?: number
  multiline?: boolean
  nestedProp?: string
  placeholder?: string
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProp: string
}): ReactElement => {
  const val = args?.[targetProp]

  return (
    <>
      <CustomFormLabel required={required} text={targetProp} />
      <StyledTextField
        disabled={disabled}
        error={returnError({ args, error, targetProp, nestedProp })}
        fullWidth={fullWidth}
        helperText={returnHelperText({ args, error, targetProp, nestedProp })}
        inputProps={{ maxLength: maxLength || 150 }}
        maxRows={maxRows}
        multiline={multiline}
        onChange={(e): void => {
          if (nestedProp) {
            setArgs({
              ...args,
              [targetProp]: { ...val, [nestedProp]: e.target.value }
            })
          } else {
            setArgs({ ...args, [targetProp]: e.target.value })
          }
        }}
        placeholder={placeholder}
        required={required}
        size={'small'}
        value={nestedProp ? val?.[nestedProp] : val}
        variant={'outlined'}
      />
    </>
  )
}

export default Text
