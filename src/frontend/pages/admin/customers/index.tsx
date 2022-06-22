import React, { ReactElement } from 'react'
import layout from '../../../layouts'
import CustomersTable from '../../../components/users/Showcase/customers/table'

const Page = (): ReactElement => {
  return (
    <>
      <CustomersTable />
    </>
  )
}

export default layout(Page, { title: 'Customers' })
