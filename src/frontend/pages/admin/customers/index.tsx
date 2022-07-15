import { ReactElement } from 'react'
import layout from '../../../layouts/admin'
import CustomersTable from '../../../components/users/Showcase/customers/table'

const Page = (): ReactElement => {
  return (
    <>
      <CustomersTable />
    </>
  )
}

export default layout(Page, { title: 'Customers' })
