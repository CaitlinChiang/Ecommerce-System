import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTextField = styled(TextField)`
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
