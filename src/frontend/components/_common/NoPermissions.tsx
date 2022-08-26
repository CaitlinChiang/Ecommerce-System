import { ReactElement } from 'react'
import { Typography } from '@mui/material'
import AuthorizedPath from '../users/Authorization'

const NoPermissions = (): ReactElement => {
  return (
    <AuthorizedPath>
      <Typography>{'You are not authorized to access this area.'}</Typography>
    </AuthorizedPath>
  )
}

export default NoPermissions
