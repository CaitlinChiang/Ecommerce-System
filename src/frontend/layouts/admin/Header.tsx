import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/_layouts/admin/header'
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
    <Toolbar sx={styles.toolbar}>
      {backRoute && (
        <IconButton
          edge={'start'}
          color={'inherit'}
          onClick={(): void => router.back()}
        >
          <ArrowBackIcon fontSize={'large'} />
        </IconButton>
      )}
      <Typography sx={styles.typography}>{pageTitle}</Typography>
    </Toolbar>
  )
}

export default Header
