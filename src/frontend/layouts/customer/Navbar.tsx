import { ReactElement, ReactEventHandler, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import EditIcon from '@mui/icons-material/Edit'
import HomeIcon from '@mui/icons-material/Home'
import SellIcon from '@mui/icons-material/Sell'
import CallIcon from '@mui/icons-material/Call'

const NavbarMobile = ({
  open,
  onClose
}: {
  open: boolean
  onClose: ReactEventHandler
}): ReactElement => {
  const router = useRouter()
  const pathName = router.pathname

  const [itemOpen, setItemOpen] = useState<any>(true)

  const handleClick = (index: any) => {
    if (itemOpen === index) {
      setItemOpen((prevOpen: any) => !prevOpen)
    } else {
      setItemOpen(index)
    }
  }

  const shoppingMenu = [
    {
      icon: <HomeIcon />,
      label: 'Home',
      route: '/'
    },
    {
      icon: <SellIcon />,
      label: 'Shop',
      route: '/shop'
    },
    {
      icon: <EditIcon />,
      label: 'Reviews',
      route: '/reviews'
    },
    {
      icon: <HelpIcon />,
      label: 'FAQs',
      route: '/faqs'
    },
    {
      icon: <CallIcon />,
      label: 'Contact',
      route: '/contact-us'
    }
  ]

  const SidebarContent = (
    <Box p={2} height='100%'>
      {/* <LogoIcon /> */}
      <Box mt={2}>
        <List>
          <Typography sx={{ marginBottom: 3 }}>{'Company Logo'}</Typography>
          {shoppingMenu.map((item, index): ReactElement => {
            return (
              <List component='li' disablePadding key={item.label}>
                <NextLink href={item.route}>
                  <ListItem
                    onClick={() => handleClick(index)}
                    button
                    sx={{
                      mb: 1,
                      ...(pathName === item.route && {
                        color: 'white',
                        backgroundColor: (theme) =>
                          `${theme.palette.primary.main}!important`
                      })
                    }}
                  >
                    <ListItemIcon
                      sx={{ ...(pathName === item.route && { color: 'white' }) }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText onClick={onClose}>{item.label}</ListItemText>
                  </ListItem>
                </NextLink>
              </List>
            )
          })}
        </List>
      </Box>
    </Box>
  )

  return (
    <Drawer
      anchor='left'
      open={open}
      onClose={onClose}
      variant={'temporary'}
      PaperProps={{
        sx: {
          width: '265px',
          border: '0 !important'
        }
      }}
    >
      {SidebarContent}
    </Drawer>
  )
}

export default NavbarMobile
