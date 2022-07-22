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
import { UserType } from '../../_enums/userType'
import { generateAdminUrl } from '../../_utils/handleData/generateAdminUrl'

const adminUrl = generateAdminUrl(UserType.ADMINISTRATOR)

const navbarItems = [
  { icon: <BarChartIcon />, label: 'Analytics', route: adminUrl },
  {
    icon: <AccountBoxIcon />,
    label: 'Administrators',
    route: `${adminUrl}/administrators`
  },
  { icon: <GroupIcon />, label: 'Customers', route: `${adminUrl}/customers` },
  { icon: <SettingsIcon />, label: 'Settings', route: `${adminUrl}/settings` },
  { icon: <ReceiptIcon />, label: 'Orders', route: `${adminUrl}/orders` },
  { icon: <InventoryIcon />, label: 'Products', route: `${adminUrl}/products` },
  { icon: <HelpIcon />, label: 'FAQs', route: `${adminUrl}/faqs` },
  { icon: <EditIcon />, label: 'Reviews', route: `${adminUrl}/reviews` },
  { icon: <DnsIcon />, label: 'Audit Logs', route: `${adminUrl}/audit-logs` }
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
          selected={router.pathname.includes(`${adminUrl}/user/account`)}
          onClick={(): void => {
            router.push(`${adminUrl}/user/account`)
          }}
          sx={styles.listItem}
        >
          <ListItemAvatar>
            <Avatar sx={styles.avatar} variant={'square'}>
              {`${user?.firstName?.[0]}`}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${user?.firstName} ${user?.lastName}`}
            secondary={user?.email}
          />
        </ListItem>
        <Divider />
        <Container sx={styles.container} />
        {navbarItems.map((item, index): ReactElement => {
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
