import React, { ReactElement, useState } from 'react'
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const PasswordField = ({
  defaultValue,
  setValue,
  value
}: {
  defaultValue?: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  value: string
}): ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
      <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
      <OutlinedInput
        defaultValue={defaultValue}
        id='outlined-adornment-password'
        label='Password'
        onChange={(e): void => {
          setValue(e.target.value)
        }}
        required
        type={showPassword ? 'PasswordField' : 'password'}
        value={value}
        endAdornment={
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
        }
      />
    </FormControl>
  )
}

export default PasswordField
