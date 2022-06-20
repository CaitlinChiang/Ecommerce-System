import React, { ReactElement } from 'react'
import layout from '../../../layouts'
import ConsumersTable from '../../../components/users/Showcase/consumersTable'

const Page = (): ReactElement => {
  return (
    <>
      <ConsumersTable />
    </>
  )
}

export default layout(Page, { title: 'Customers' })
