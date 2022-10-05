import { ReactElement, ReactEventHandler, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery
} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import GroupIcon from '@mui/icons-material/Group'
import ReceiptIcon from '@mui/icons-material/Receipt'
import InventoryIcon from '@mui/icons-material/Inventory'
import HelpIcon from '@mui/icons-material/Help'
import EditIcon from '@mui/icons-material/Edit'
import DnsIcon from '@mui/icons-material/Dns'
import BarChartIcon from '@mui/icons-material/BarChart'
import CategoryIcon from '@mui/icons-material/Category'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import CreateIcon from '@mui/icons-material/Create'
import ViewListIcon from '@mui/icons-material/ViewList'
import PaymentIcon from '@mui/icons-material/Payment'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { AdminPermission } from '../../_enums/adminPermission'
import { UserType } from '../../_enums/userType'
import { generateAdminUrl } from '../../_utils/auth/generateAdminUrl'
import { authenticateUser } from '../../_utils/auth/authenticateUser'

const adminUrl = generateAdminUrl(UserType.ADMINISTRATOR)

const navbarItems = [
  {
    navLabel: true,
    subheader: 'MY ACCOUNT',
    icon: 'mdi mdi-dots-horizontal'
  },
  {
    icon: <AccountBoxIcon />,
    label: 'Profile',
    route: `${adminUrl}/user/profile`
  },
  {
    navLabel: true,
    subheader: 'DASHBOARD',
    icon: 'mdi mdi-dots-horizontal'
  },
  {
    icon: <BarChartIcon />,
    label: 'Analytics',
    permission: AdminPermission.VIEW_ANALYTICS,
    route: adminUrl
  },
  {
    navLabel: true,
    subheader: 'MANAGE ACCOUNTS',
    icon: 'mdi mdi-dots-horizontal'
  },
  {
    icon: <AccountBoxIcon />,
    label: 'Administrators',
    permission: AdminPermission.VIEW_USER,
    collapse: true,
    children: [
      {
        icon: <ViewListIcon />,
        label: 'List',
        permission: AdminPermission.VIEW_USER,
        route: `${adminUrl}/administrators`
      },
      {
        icon: <CreateIcon />,
        label: 'Create',
        permission: AdminPermission.CREATE_USER,
        route: `${adminUrl}/administrators/create`
      }
    ]
  },
  {
    icon: <GroupIcon />,
    label: 'Customers',
    permission: AdminPermission.VIEW_USER,
    route: `${adminUrl}/customers`
  },
  {
    navLabel: true,
    subheader: 'MANAGE SHOP',
    icon: 'mdi mdi-dots-horizontal'
  },
  {
    icon: <CategoryIcon />,
    label: 'Product Categories',
    permission: AdminPermission.VIEW_PRODUCT_CATEGORY,
    collapse: true,
    children: [
      {
        icon: <ViewListIcon />,
        label: 'List',
        permission: AdminPermission.VIEW_PRODUCT_CATEGORY,
        route: `${adminUrl}/product-categories`
      },
      {
        icon: <CreateIcon />,
        label: 'Create',
        permission: AdminPermission.CREATE_PRODUCT_CATEGORY,
        route: `${adminUrl}/product-categories/create`
      }
    ]
  },
  {
    icon: <InventoryIcon />,
    label: 'Products',
    permission: AdminPermission.VIEW_PRODUCT,
    collapse: true,
    children: [
      {
        icon: <ViewListIcon />,
        label: 'List',
        permission: AdminPermission.VIEW_PRODUCT,
        route: `${adminUrl}/products`
      },
      {
        icon: <CreateIcon />,
        label: 'Create',
        permission: AdminPermission.CREATE_PRODUCT,
        route: `${adminUrl}/products/create`
      }
    ]
  },
  {
    navLabel: true,
    subheader: 'MANAGE ORDERS',
    icon: 'mdi mdi-dots-horizontal'
  },
  {
    icon: <ReceiptIcon />,
    label: 'Orders',
    permission: AdminPermission.VIEW_ORDER,
    route: `${adminUrl}/orders`
  },
  {
    icon: <PaymentIcon />,
    label: 'Payment Methods',
    permission: AdminPermission.VIEW_PAYMENT_METHOD,
    collapse: true,
    children: [
      {
        icon: <ViewListIcon />,
        label: 'List',
        permission: AdminPermission.VIEW_PAYMENT_METHOD,
        route: `${adminUrl}/payment-methods`
      },
      {
        icon: <CreateIcon />,
        label: 'Create',
        permission: AdminPermission.CREATE_PAYMENT_METHOD,
        route: `${adminUrl}/payment-methods/create`
      }
    ]
  },
  {
    icon: <LocalShippingIcon />,
    label: 'Shipping Fees',
    permission: AdminPermission.VIEW_CITY,
    collapse: true,
    children: [
      {
        icon: <ViewListIcon />,
        label: 'List',
        permission: AdminPermission.VIEW_CITY,
        route: `${adminUrl}/cities`
      },
      {
        icon: <CreateIcon />,
        label: 'Create',
        permission: AdminPermission.CREATE_CITY,
        route: `${adminUrl}/cities/create`
      }
    ]
  },
  {
    navLabel: true,
    subheader: 'MANAGE WEBSITE',
    icon: 'mdi mdi-dots-horizontal'
  },
  {
    icon: <FormatAlignLeftIcon />,
    label: 'Website Texts',
    permission: AdminPermission.VIEW_USER,
    route: `${adminUrl}/website-texts`
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
    navLabel: true,
    subheader: 'LOGS',
    icon: 'mdi mdi-dots-horizontal'
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
  onClose
}: {
  open: boolean
  onClose: ReactEventHandler
}): ReactElement => {
  const router = useRouter()
  const shortenURL = router.pathname.slice(0, router.pathname.lastIndexOf('/'))
  const pathName = router.pathname

  const [itemOpen, setItemOpen] = useState<any>(true)

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'))

  const handleClick = (index: any) => {
    if (itemOpen === index) {
      setItemOpen((prevOpen: any) => !prevOpen)
    } else {
      setItemOpen(index)
    }
  }

  const SidebarContent = (
    <Box p={2} height='100%'>
      {/* <LogoIcon /> */}
      <Box mt={2}>
        <List>
          {navbarItems.map((item, index): ReactElement => {
            if (item?.permission && !authenticateUser(item?.permission)) return

            if (item.subheader) {
              return (
                <li key={item.subheader}>
                  <Typography
                    variant='subtitle2'
                    fontWeight='500'
                    sx={{ my: 2, mt: 4, opacity: '0.4' }}
                  >
                    {item.subheader}
                  </Typography>
                </li>
              )
            }

            if (item.children) {
              return (
                <>
                  <ListItem
                    button
                    component='li'
                    onClick={() => handleClick(index)}
                    selected={shortenURL === item.route}
                    sx={{
                      mb: 1,
                      ...(shortenURL === item.route && {
                        color: 'white',
                        backgroundColor: (theme) =>
                          `${theme.palette.primary.main}!important`
                      })
                    }}
                  >
                    <ListItemIcon
                      sx={{ ...(shortenURL === item.route && { color: 'white' }) }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText>{item.label}</ListItemText>
                    {index === itemOpen || shortenURL === item.route ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <ChevronRightIcon />
                    )}
                  </ListItem>
                  <Collapse
                    in={index === itemOpen || shortenURL === item.route}
                    timeout='auto'
                    unmountOnExit
                  >
                    <List component='li' disablePadding>
                      {item.children.map((child) => {
                        return (
                          <NextLink
                            key={child.label}
                            href={child.route}
                            onClick={onClose}
                          >
                            <ListItem
                              button
                              selected={pathName === child.route}
                              sx={{
                                mb: 1,
                                ...(pathName === child.route && {
                                  color: 'primary.main',
                                  backgroundColor: 'transparent!important'
                                })
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  svg: { width: '14px', marginLeft: '3px' },
                                  ...(pathName === child.route && {
                                    color: 'primary.main'
                                  })
                                }}
                              >
                                {item.icon}
                              </ListItemIcon>
                              <ListItemText>{child.label}</ListItemText>
                            </ListItem>
                          </NextLink>
                        )
                      })}
                    </List>
                  </Collapse>
                </>
              )
            }

            return (
              <List component='li' disablePadding key={item.label}>
                <NextLink href={item.route}>
                  <ListItem
                    onClick={() => handleClick(index)}
                    button
                    selected={pathName === item.route}
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
                      sx={{
                        ...(pathName === item.route && { color: 'white' })
                      }}
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

  if (lgUp) {
    return (
      <Drawer
        anchor={'left'}
        open={open}
        variant='persistent'
        PaperProps={{
          sx: {
            width: '265px',
            border: '0 !important',
            boxShadow: '0px 7px 30px 0px rgb(113 122 131 / 11%)'
          }
        }}
      >
        {SidebarContent}
      </Drawer>
    )
  }

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

export default Navbar
