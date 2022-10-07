import { ReactElement } from 'react'
import { Box, Button } from '@mui/material'

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
    <Box
      sx={{
        m: 1,
        marginTop: 5,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
      }}
    >
      <Button disabled={disabled} onClick={onClick} variant={'contained'}>
        {title || 'Create'}
      </Button>
    </Box>
  )
}

export default MutationButton
