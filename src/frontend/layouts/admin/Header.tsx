import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import theme from '../../themes'
import { Toolbar, IconButton, Typography } from '@mui/material'
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
    <Toolbar sx={{ marginTop: theme.spacing(3), marginLeft: theme.spacing(34) }}>
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
        sx={{ flexGrow: 1, display: 'flex', marginLeft: theme.spacing(3) }}
      >
        {pageTitle}
      </Typography>
    </Toolbar>
  )
}

export default Header
