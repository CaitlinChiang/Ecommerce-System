import React, { ReactElement } from 'react'
import layout from '../../../layouts'
import ConsumerTable from '../../../components/users/Showcase/consumerTable'

const Page = (): ReactElement => {
  return (
    <>
      <ConsumerTable />
    </>
  )
}

export default layout(Page, { title: 'Customers', backRoute: '/' })
