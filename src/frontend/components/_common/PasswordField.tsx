import { ReactElement, useState } from 'react'
import { InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import CustomFormLabel from './CustomFormLabel'
import { StyledTextField } from './StyledTextField'
import { returnError } from '../../_utils/handleArgs/returnError'
import { returnHelperText } from '../../_utils/handleArgs/returnHelperText'

const PasswordField = ({
  args,
  error,
  required,
  setArgs,
  targetProp
}: {
  args: any
  error?: boolean
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProp: string
}): ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const val = args?.[targetProp]

  return (
    <>
      <CustomFormLabel required={required} text={targetProp} />
      <StyledTextField
        error={returnError({ args, error, targetProp })}
        fullWidth
        helperText={returnHelperText({ args, error, targetProp })}
        onChange={(e): void => {
          setArgs({ ...args, [targetProp]: e.target.value })
        }}
        required={required}
        size={'small'}
        type={showPassword ? 'PasswordField' : 'password'}
        value={val}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={(): void => setShowPassword(!showPassword)}
                onMouseDown={(e: React.MouseEvent<HTMLButtonElement>): void => {
                  e.preventDefault()
                }}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </>
  )
}

export default PasswordField
