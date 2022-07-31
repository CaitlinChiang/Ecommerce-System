import { ReactElement, useState } from 'react'
import { InputAdornment, IconButton, TextField } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { formatProperCapitalization } from '../../_utils/handleFormat/formatProperCapitalization'

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

  return (
    <TextField
      error={error && args?.[targetProp]?.length < 8}
      helperText={
        error &&
        args?.[targetProp]?.length < 8 &&
        'Password must be at least 8 characters long.'
      }
      label={formatProperCapitalization(targetProp)}
      onChange={(e): void => {
        setArgs({ ...args, [targetProp]: e.target.value })
      }}
      required={required}
      type={showPassword ? 'PasswordField' : 'password'}
      value={args?.[targetProp]}
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
  )
}

export default PasswordField
