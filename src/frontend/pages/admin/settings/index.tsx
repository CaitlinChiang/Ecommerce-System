import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedAccess from '../../../components/users/Authorization'
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
      content: <UpdateHomeSlogan />,
      permission: AdminPermission.VIEW_WEBSITE_TEXT
    },
    {
      title: 'About Page Write-up',
      content: <UpdateAboutWriteup />,
      permission: AdminPermission.VIEW_WEBSITE_TEXT
    },
    {
      title: 'Contact Information',
      content: <UpdateContactInformation />,
      permission: AdminPermission.VIEW_WEBSITE_TEXT
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
    if (authenticateUser(row.permission)) {
      return { title: row.title, content: row.content }
    }
  })

  return (
    <AuthorizedAccess>
      <DropdownsComponent icons={icons} rows={authenticatedRows} />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Settings' })
