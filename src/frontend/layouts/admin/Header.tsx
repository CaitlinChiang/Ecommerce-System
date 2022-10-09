import { ReactElement } from 'react'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Header = ({
  customClass,
  position,
  sx,
  toggleMobileNavbar,
  toggleNavbar
}: {
  customClass?: any
  position?: 'fixed' | 'absolute' | 'relative' | 'static' | 'sticky'
  sx?: any
  toggleMobileNavbar?: VoidFunction
  toggleNavbar?: VoidFunction
}): ReactElement => {
  return (
    <>
      <AppBar sx={sx} position={position} elevation={0} className={customClass}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={toggleNavbar}
            size='large'
            sx={{ display: { lg: 'flex', xs: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            size='large'
            color='inherit'
            aria-label='menu'
            onClick={toggleMobileNavbar}
            sx={{ display: { lg: 'none', xs: 'flex' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
