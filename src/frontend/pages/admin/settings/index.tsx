import { ReactElement } from 'react'
import layout from '../../../layouts'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DropdownsComponent from '../../../components/_common/DropdownsComponent'
import UpdateHomeSlogan from '../../../components/websiteTexts/Update/homeSlogan'
import UpdateAboutWriteup from '../../../components/websiteTexts/Update/aboutWriteup'
import UpdateContactInformation from '../../../components/websiteTexts/Update/contactInformation'
import ProductCategoriesTable from '../../../components/productCategories/Showcase/table'
import PaymentMethodsTable from '../../../components/paymentMethods/Showcase/table'
import CitiesTable from '../../../components/cities/Showcase/table'

const Page = (): ReactElement => {
  const icons = {
    closed: <ChevronRightIcon />,
    opened: <KeyboardArrowDownIcon />
  }

  const rows = [
    { title: 'Home Page Slogan', content: <UpdateHomeSlogan /> },
    { title: 'About Page Write-up', content: <UpdateAboutWriteup /> },
    { title: 'Contact Information', content: <UpdateContactInformation /> },
    { title: 'Product Categories', content: <ProductCategoriesTable /> },
    { title: 'Payment Methods', content: <PaymentMethodsTable /> },
    { title: 'Cities & Shipping Fees', content: <CitiesTable /> }
  ]

  return (
    <>
      <DropdownsComponent icons={icons} rows={rows} />
    </>
  )
}

export default layout(Page, { title: 'Settings' })
