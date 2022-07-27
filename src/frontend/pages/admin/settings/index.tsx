import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DropdownsComponent from '../../../components/_common/DropdownsComponent'
import UpdateHomeSlogan from '../../../components/websiteTexts/Update/homeSlogan'
import UpdateAboutWriteup from '../../../components/websiteTexts/Update/aboutWriteup'
import UpdateContactInformation from '../../../components/websiteTexts/Update/contactInformation'
import ProductCategoriesTable from '../../../components/productCategories/View/table'
import PaymentMethodsTable from '../../../components/paymentMethods/View/table'
import CitiesTable from '../../../components/cities/View/table'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

const Page = (): ReactElement => {
  const icons = {
    closed: <ChevronRightIcon />,
    opened: <KeyboardArrowDownIcon />
  }

  const rows = [
    {
      title: 'Home Page Slogan',
      content: <UpdateHomeSlogan />
    },
    {
      title: 'About Page Write-up',
      content: <UpdateAboutWriteup />
    },
    {
      title: 'Contact Information',
      content: <UpdateContactInformation />
    },
    {
      title: 'Product Categories',
      content: <ProductCategoriesTable />,
      permission: AdminPermission.VIEW_PRODUCT_CATEGORY
    },
    {
      title: 'Payment Methods',
      content: <PaymentMethodsTable />,
      permission: AdminPermission.VIEW_PAYMENT_METHOD
    },
    {
      title: 'Cities & Shipping Fees',
      content: <CitiesTable />,
      permission: AdminPermission.VIEW_CITY
    }
  ]

  const authenticatedRows = rows.map((row: any) => {
    if (row?.permission && !authenticateUser(row?.permission)) return
    return { title: row.title, content: row.content }
  })

  return (
    <>
      <DropdownsComponent icons={icons} rows={authenticatedRows} />
    </>
  )
}

export default layout(Page, { title: 'Settings' })
