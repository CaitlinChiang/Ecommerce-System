import { ReactElement } from 'react'
import { Box, Button } from '@mui/material'
import { buttonToRight } from '../../themes/styles'

const MutationButton = ({
  disabled,
  onClick,
  title
}: {
  disabled?: boolean
  onClick: VoidFunction
  title?: string
}): ReactElement => {
  return (
    <Box sx={buttonToRight}>
      <Button disabled={disabled} onClick={onClick} variant={'contained'}>
        {title || 'Create'}
      </Button>
    </Box>
  )
}

export default MutationButton
