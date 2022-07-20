import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/_layouts/customer/navbar'
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
import ContactInformation from '../../components/websiteTexts/Showcase/contactInformation'

const shoppingMenu = [
  { label: 'Home', route: '/' },
  { label: 'Shop', route: '/shop' },
  { label: 'Reviews', route: '/reviews' },
  { label: 'FAQs', route: '/faqs' },
  { label: 'Contact Us' }
]

const trackingMenu = [
  { icon: <ShoppingCartIcon />, route: '/cart' },
  { icon: <ReceiptIcon />, route: '/orders' },
  { icon: <AccountCircleIcon />, route: '/user/profile' }
]

const Navbar = (): ReactElement => {
  const router = useRouter()

  const [openContactInfo, setOpenContactInfo] = useState<boolean>(false)

  return (
    <AppBar position={'static'}>
      <Toolbar>
        <Typography sx={styles.typography}>{'Logo'}</Typography>
        <List sx={styles.list}>
          {shoppingMenu.map((menuItem, index): ReactElement => {
            return (
              <ListItemButton
                key={index}
                onClick={(): any => {
                  if (menuItem.route) {
                    router.push(menuItem.route)
                  } else {
                    setOpenContactInfo(!openContactInfo)
                  }
                }}
              >
                <ListItemText primary={menuItem.label.toUpperCase()} />
              </ListItemButton>
            )
          })}
        </List>
        <List sx={styles.list}>
          {trackingMenu.map((menuItem, index): ReactElement => {
            return (
              <ListItemButton
                key={index}
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
      {openContactInfo && <ContactInformation />}
    </AppBar>
  )
}

export default Navbar
