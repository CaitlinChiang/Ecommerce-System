import { ReactElement, ReactEventHandler } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/_layouts/admin/navbar'
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
import { AdminPermission } from '../../_enums/adminPermission'
import { UserType } from '../../_enums/userType'
import { generateAdminUrl } from '../../_utils/auth/generateAdminUrl'
import { authenticateUser } from 'frontend/_utils/auth/authenticateUser'

const adminUrl = generateAdminUrl(UserType.ADMINISTRATOR)

const navbarItems = [
  {
    icon: <BarChartIcon />,
    label: 'Analytics',
    permission: AdminPermission.VIEW_ANALYTICS,
    route: adminUrl
  },
  {
    icon: <AccountBoxIcon />,
    label: 'Administrators',
    permission: AdminPermission.VIEW_USER,
    route: `${adminUrl}/administrators`
  },
  {
    icon: <GroupIcon />,
    label: 'Customers',
    permission: AdminPermission.VIEW_USER,
    route: `${adminUrl}/customers`
  },
  { icon: <SettingsIcon />, label: 'Settings', route: `${adminUrl}/settings` },
  {
    icon: <ReceiptIcon />,
    label: 'Orders',
    permission: AdminPermission.VIEW_ORDER,
    route: `${adminUrl}/orders`
  },
  {
    icon: <InventoryIcon />,
    label: 'Products',
    permission: AdminPermission.VIEW_PRODUCT,
    route: `${adminUrl}/products`
  },
  {
    icon: <HelpIcon />,
    label: 'FAQs',
    permission: AdminPermission.VIEW_FAQ,
    route: `${adminUrl}/faqs`
  },
  {
    icon: <EditIcon />,
    label: 'Reviews',
    permission: AdminPermission.VIEW_REVIEW,
    route: `${adminUrl}/reviews`
  },
  {
    icon: <DnsIcon />,
    label: 'Audit Logs',
    permission: AdminPermission.VIEW_AUDIT_LOGS,
    route: `${adminUrl}/audit-logs`
  }
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
      sx={styles.drawer}
      variant={permanent ? 'permanent' : 'temporary'}
    >
      <List dense>
        <ListItem
          button
          selected={router.pathname.includes(`${adminUrl}/user/profile`)}
          onClick={(): void => {
            router.push(`${adminUrl}/user/profile`)
          }}
          sx={styles.listItem}
        >
          <ListItemAvatar>
            <Avatar sx={styles.avatar} variant={'square'}>
              {`${user?.firstName?.[0] || 'N'}`}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${user?.firstName || 'No'} ${user?.lastName || 'User'}`}
            secondary={user?.email}
          />
        </ListItem>
        <Divider />
        <Container sx={styles.container} />
        {navbarItems.map((item, index): ReactElement => {
          if (item?.permission && !authenticateUser(item?.permission)) return

          return (
            <ListItem
              button
              key={index}
              onClick={(): void => {
                router.push(item.route)
              }}
              sx={styles.listItem}
            >
              <ListItemIcon sx={styles.listItemIcon}>{item.icon}</ListItemIcon>
              <Typography sx={styles.listTypography}>{item.label}</Typography>
            </ListItem>
          )
        })}
      </List>
      <Container sx={styles.container} />
      <Divider />
      <Box sx={styles.box}>
        <Typography>{'Company Logo'}</Typography>
        <Typography sx={styles.companyNameTypography}>{'Company Name'}</Typography>
      </Box>
    </Drawer>
  )
}

export default Navbar
