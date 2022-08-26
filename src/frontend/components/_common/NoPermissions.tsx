import { ReactElement } from 'react'
import { Typography } from '@mui/material'
import AuthorizedPath from '../users/Authorization'

const NoPermissions = (): ReactElement => {
  return (
    <AuthorizedPath>
      <Typography>{'You have no authorization to access this area.'}</Typography>
    </AuthorizedPath>
  )
}

export default NoPermissions
