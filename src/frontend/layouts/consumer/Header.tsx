import { Toolbar, IconButton, Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const Header = ({
  pageTitle,
  backRoute
}: {
  pageTitle?: string
  backRoute?: string
}): ReactElement => {
  const router = useRouter()

  return (
    <Toolbar>
      {backRoute && (
        <IconButton
          edge={'start'}
          color={'inherit'}
          onClick={(): void => {
            router.push(backRoute)
          }}
        >
          <ArrowBackIcon fontSize={'large'} />
        </IconButton>
      )}
      <Typography
        variant={'h4'}
        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}
      >
        {pageTitle}
      </Typography>
    </Toolbar>
  )
}

export default Header
