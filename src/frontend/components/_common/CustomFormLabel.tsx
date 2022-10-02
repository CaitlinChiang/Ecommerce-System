import { ReactElement } from 'react'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { formatText } from '../../_utils/handleFormat/formatText'

const CustomFormLabel = ({
  required,
  text
}: {
  required?: boolean
  text: string
}): ReactElement => {
  const StyledFormLabel: any = styled((props) => (
    <Typography variant='h6' {...props} component='label' />
  ))(() => ({
    marginBottom: '5px',
    marginTop: '15px',
    display: 'block'
  }))

  return (
    <>
      <StyledFormLabel sx={{ mt: 0 }}>
        {formatText(text)}
        {required && ' *'}
      </StyledFormLabel>
    </>
  )
}

export default CustomFormLabel
