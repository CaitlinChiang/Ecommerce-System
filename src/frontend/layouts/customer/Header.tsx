import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { typography } from '../../styles/_layouts/customer/header'
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
    <Toolbar>
      {backRoute && (
        <IconButton
          edge={'start'}
          color={'inherit'}
          onClick={(): void => router.back()}
        >
          <ArrowBackIcon fontSize={'large'} />
        </IconButton>
      )}
      <Typography variant={'h4'} sx={typography}>
        {pageTitle}
      </Typography>
    </Toolbar>
  )
}

export default Header
