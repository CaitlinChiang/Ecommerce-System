import { ReactElement } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GetCart } from '../query'
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ReceiptIcon from '@mui/icons-material/Receipt'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import { Cart } from '../../../types/cart'
import { formatNumber } from '../../_utils/handleFormat/formatNumber'

const globalAny: any = global

const Header = ({
  customClass,
  isMobile,
  position,
  sx,
  toggleMobileNavbar
}: {
  customClass?: any
  isMobile?: boolean
  position?: 'fixed' | 'absolute' | 'relative' | 'static' | 'sticky'
  sx?: any
  toggleMobileNavbar?: VoidFunction
}): ReactElement => {
  const router = useRouter()

  const { data, refetch } = useQuery(GetCart)
  const cart: Cart = data?.get_cart || {}

  globalAny.updateCartQuantity = (): void => {
    refetch()
  }

  const shoppingMenu = [
    { label: 'Home', route: '/' },
    { label: 'Shop', route: '/shop' },
    { label: 'Reviews', route: '/reviews' },
    { label: 'FAQs', route: '/faqs' },
    { label: 'Contact', route: '/contact-us' }
  ]

  const trackingMenu = [
    {
      icon: (
        <Badge badgeContent={formatNumber(cart?.quantity)} color={'secondary'}>
          <ShoppingCartIcon />
        </Badge>
      ),
      route: '/cart'
    },
    { icon: <ReceiptIcon />, route: '/orders' },
    { icon: <AccountCircleIcon />, route: '/user/profile' }
  ]

  return (
    <>
      <AppBar sx={sx} position={position} elevation={0} className={customClass}>
        <Toolbar>
          {isMobile && (
            <>
              <IconButton
                size='large'
                aria-label='menu'
                onClick={toggleMobileNavbar}
                sx={{ color: '#ffffff', display: { lg: 'none', xs: 'flex' } }}
              >
                <MenuIcon />
              </IconButton>
            </>
          )}
          {!isMobile && (
            <>
              <Typography>{'Company Logo'}</Typography>
              <List sx={{ display: 'flex', flexDirection: 'row', marginLeft: 5 }}>
                {shoppingMenu.map((menuItem, index): ReactElement => {
                  return (
                    <>
                      <NextLink key={index} href={menuItem.route}>
                        <ListItem
                          button
                          onClick={(): any => {
                            router.push(menuItem.route)
                          }}
                          sx={{ color: 'white' }}
                        >
                          <ListItemText primary={menuItem.label.toUpperCase()} />
                        </ListItem>
                      </NextLink>
                    </>
                  )
                })}
              </List>
            </>
          )}
          <Box flexGrow={1} />
          {trackingMenu.map((menuItem, index): ReactElement => {
            return (
              <IconButton
                key={index}
                onClick={(): void => {
                  router.push(menuItem.route)
                }}
                sx={{ color: '#ffffff', marginLeft: 2 }}
              >
                {menuItem.icon}
              </IconButton>
            )
          })}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
