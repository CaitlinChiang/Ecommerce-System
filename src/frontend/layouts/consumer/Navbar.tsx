import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import {
  AppBar,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ReceiptIcon from '@mui/icons-material/Receipt'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const shoppingMenu = [
  { label: 'Home', route: '/home' },
  { label: 'About', route: '/about' },
  { label: 'Shop', route: '/shop' },
  { label: 'Reviews', route: '/reviews' },
  { label: 'FAQs', route: '/frequently-asked-questions' },
  { label: 'Contact Us', route: '/contact-us' }
]

const trackingMenu = [
  { icon: <ShoppingCartIcon />, route: '/cart' },
  { icon: <ReceiptIcon />, route: '/my-orders' },
  { icon: <AccountCircleIcon />, route: '/profile' }
]

const Navbar = (): ReactElement => {
  const router = useRouter()

  return (
    <AppBar position={'static'}>
      <Toolbar>
        <Typography variant={'h6'} sx={{ flexGrow: 1 }}>
          {'Logo'}
        </Typography>
        <List sx={{ display: 'flex' }}>
          {shoppingMenu.map((menuItem): ReactElement => {
            return (
              <ListItemButton
                onClick={(): void => {
                  router.push(menuItem.route)
                }}
              >
                <ListItemText primary={menuItem.label.toUpperCase()} />
              </ListItemButton>
            )
          })}
        </List>
        <List sx={{ display: 'flex' }}>
          {trackingMenu.map((menuItem): ReactElement => {
            return (
              <ListItemButton
                onClick={(): void => {
                  router.push(menuItem.route)
                }}
              >
                {menuItem.icon}
              </ListItemButton>
            )
          })}
        </List>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
