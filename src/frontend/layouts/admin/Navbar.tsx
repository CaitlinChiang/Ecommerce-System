import { ReactElement, ReactEventHandler } from 'react'
import { useRouter } from 'next/router'
import {
  drawer,
  listItem,
  avatar,
  container,
  listItemIcon,
  listTypography,
  box,
  companyNameTypography
} from '../../styles/_layouts/admin/navbar'
import {
  Avatar,
  Box,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import GroupIcon from '@mui/icons-material/Group'
import SettingsIcon from '@mui/icons-material/Settings'
import ReceiptIcon from '@mui/icons-material/Receipt'
import InventoryIcon from '@mui/icons-material/Inventory'
import HelpIcon from '@mui/icons-material/Help'
import EditIcon from '@mui/icons-material/Edit'
import DnsIcon from '@mui/icons-material/Dns'
import BarChartIcon from '@mui/icons-material/BarChart'
import { User } from '../../../types/user'

const navbarItems = [
  { icon: <BarChartIcon />, label: 'Analytics', route: '/admin/' },
  {
    icon: <AccountBoxIcon />,
    label: 'Administrators',
    route: '/admin/administrators'
  },
  { icon: <GroupIcon />, label: 'Customers', route: '/admin/customers' },
  { icon: <SettingsIcon />, label: 'Settings', route: '/admin/settings' },
  { icon: <ReceiptIcon />, label: 'Orders', route: '/admin/orders' },
  { icon: <InventoryIcon />, label: 'Products', route: '/admin/products' },
  { icon: <HelpIcon />, label: 'FAQs', route: '/admin/faqs' },
  { icon: <EditIcon />, label: 'Reviews', route: '/admin/reviews' },
  { icon: <DnsIcon />, label: 'Audit Logs', route: '/admin/audit-logs' }
]

const Navbar = ({
  open,
  onClose,
  permanent,
  user
}: {
  open: boolean
  onClose: ReactEventHandler
  permanent?: boolean
  user?: User
}): ReactElement => {
  const router = useRouter()

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={drawer}
      variant={permanent ? 'permanent' : 'temporary'}
    >
      <List dense>
        <ListItem
          button
          selected={router.pathname.includes('/admin/user/account')}
          onClick={(): void => {
            router.push('/admin/user/account')
          }}
          sx={listItem}
        >
          <ListItemAvatar>
            <Avatar sx={avatar} variant={'square'}>
              {`${user?.firstName?.[0]}`}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${user?.firstName} ${user?.lastName}`}
            secondary={user?.email}
          />
        </ListItem>
        <Divider />
        <Container sx={container} />
        {navbarItems.map((item, index): ReactElement => {
          return (
            <ListItem
              button
              key={index}
              onClick={(): void => {
                router.push(item.route)
              }}
              sx={listItem}
            >
              <ListItemIcon sx={listItemIcon}>{item.icon}</ListItemIcon>
              <Typography sx={listTypography}>{item.label}</Typography>
            </ListItem>
          )
        })}
      </List>
      <Container sx={container} />
      <Divider />
      <Box sx={box}>
        <Typography>{'Company Logo'}</Typography>
        <Typography sx={companyNameTypography}>{'Company Name'}</Typography>
      </Box>
    </Drawer>
  )
}

export default Navbar
