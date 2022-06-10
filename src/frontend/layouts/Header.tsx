import { Toolbar, IconButton, Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import theme from '../themes'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'

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
          sx={{
            marginRight: theme.spacing(2)
          }}
          edge={'start'}
          color={'inherit'}
          onClick={(): void => {
            router.push(backRoute)
          }}
        >
          <ArrowLeftIcon />
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
