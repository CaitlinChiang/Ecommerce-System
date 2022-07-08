import { ReactElement, useState } from 'react'
import { InputAdornment, IconButton, TextField } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const PasswordField = ({
  args,
  error,
  required,
  setArgs
}: {
  args: any
  error?: boolean
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
}): ReactElement => {
  const { password } = args
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <TextField
      error={error}
      helperText={error && 'Password must be at least 8 characters long.'}
      label='Password'
      onChange={(e): void => {
        setArgs({ ...args, password: e.target.value })
      }}
      required={required}
      type={showPassword ? 'PasswordField' : 'password'}
      value={password}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={() => setShowPassword(!showPassword)}
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
