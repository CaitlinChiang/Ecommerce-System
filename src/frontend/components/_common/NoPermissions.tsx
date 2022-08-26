import { ReactElement } from 'react'
import { Typography } from '@mui/material'

const NoPermissions = (): ReactElement => {
  return <Typography>{'You are not authorized to access this area.'}</Typography>
}

export default NoPermissions
