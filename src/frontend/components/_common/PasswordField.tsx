import React, { ReactElement, useState } from 'react'
import { InputAdornment, IconButton, TextField } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const PasswordField = ({
  defaultValue,
  password,
  setPassword
}: {
  defaultValue?: string
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
}): ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <TextField
      defaultValue={defaultValue}
      error={password?.length < 8}
      helperText={
        password?.length < 8 && 'Password must be at least 8 characters long.'
      }
      id='outlined-adornment-password'
      label='Password'
      onChange={(e): void => {
        setPassword(e.target.value)
      }}
      required
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
