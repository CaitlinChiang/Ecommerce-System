import { AppBar, Toolbar, Typography } from '@mui/material'
import React, { ReactElement } from 'react'

const Navbar = (): ReactElement => {
  return (
    <AppBar position={'static'}>
      <Toolbar>
        <Typography variant={'h6'} sx={{ flexGrow: 1 }}>
          {'Logo'}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
