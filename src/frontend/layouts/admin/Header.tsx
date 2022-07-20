import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { toolbar, typography } from '../../styles/_layouts/admin/header'
import { Toolbar, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const Header = ({
  pageTitle,
  backRoute
}: {
  pageTitle?: string
  backRoute?: boolean
}): ReactElement => {
  const router = useRouter()

  return (
    <Toolbar sx={toolbar}>
      {backRoute && (
        <IconButton
          edge={'start'}
          color={'inherit'}
          onClick={(): void => router.back()}
        >
          <ArrowBackIcon fontSize={'large'} />
        </IconButton>
      )}
      <Typography sx={typography}>{pageTitle}</Typography>
    </Toolbar>
  )
}

export default Header
