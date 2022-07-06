import { ReactElement, ReactEventHandler } from 'react'
import { useRouter } from 'next/router'
import theme from '../../themes'
import {
  Avatar,
  Box,
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
  { icon: <DnsIcon />, label: 'Audit Logs', route: '/admin/audit-logs' },
  { icon: <BarChartIcon />, label: 'Analytics', route: '/admin/analytics' }
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
      sx={{ paper: 400, width: 400 }}
      variant={permanent ? 'permanent' : 'temporary'}
    >
      <List dense>
        <ListItem
          button
          selected={router.pathname.includes('/admin/user/account')}
          onClick={(): void => {
            router.push('/admin/user/account')
          }}
          sx={{ paddingTop: theme.spacing(3), paddingBottom: theme.spacing(3) }}
        >
          <ListItemAvatar>
            <Avatar
              sx={{
                color: '#ffffff',
                backgroundColor: theme.palette.secondary.main
              }}
              variant={'square'}
            >
              {`${user?.firstName?.[0]}`}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={user?.firstName + ' ' + user?.lastName}
            secondary={user?.email}
          />
        </ListItem>
        <Divider />
        <div style={{ marginTop: '25px' }} />
        {navbarItems.map((item, index): ReactElement => {
          return (
            <ListItem
              key={index}
              button
              onClick={(): void => {
                router.push(item.route)
              }}
              sx={{ padding: theme.spacing(1.7) }}
            >
              <ListItemIcon
                sx={{
                  color: theme.palette.primary.main,
                  marginLeft: theme.spacing(2)
                }}
              >
                {item.icon}
              </ListItemIcon>
              <Typography sx={{ fontSize: 16 }}>{item.label}</Typography>
            </ListItem>
          )
        })}
      </List>
      <div style={{ marginTop: '25px' }} />
      <Divider />
      <Box sx={{ fontSize: 20, textAlign: 'center', paddingTop: theme.spacing(7) }}>
        <Typography>{'Company Logo'}</Typography>
        <Typography sx={{ paddingTop: theme.spacing(3), fontSize: 20 }}>
          {'Company Name'}
        </Typography>
      </Box>
    </Drawer>
  )
}

export default Navbar
