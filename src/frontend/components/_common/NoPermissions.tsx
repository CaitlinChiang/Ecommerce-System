import { ReactElement } from 'react'
import { Typography } from '@mui/material'

const NoPermissions = (): ReactElement => {
  return (
    <Typography variant={'h3'}>
      {'You are not authorized to access this area.'}
    </Typography>
  )
}

export default NoPermissions
