import { ReactElement } from 'react'
import layout from '../../layouts'
import OrdersTable from '../../components/orders/Showcase/customers/table'

const Page = (): ReactElement => {
  return (
    <>
      <OrdersTable />
    </>
  )
}

export default layout(Page, { title: 'Orders' })
