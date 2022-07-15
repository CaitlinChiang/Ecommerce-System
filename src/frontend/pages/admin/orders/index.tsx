import { ReactElement } from 'react'
import layout from '../../../layouts/admin'
import OrdersTable from '../../../components/orders/Showcase/administrators/table'

const Page = (): ReactElement => {
  return (
    <>
      <OrdersTable />
    </>
  )
}

export default layout(Page, { title: 'Orders' })
