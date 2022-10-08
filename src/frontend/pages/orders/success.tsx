import { ReactElement } from 'react'
import layout from '../../layouts/customer'
import OrderSuccess from '../../components/orders/Create/orderSuccess'

const Page = (): ReactElement => {
  return (
    <>
      <OrderSuccess />
    </>
  )
}

export default layout(Page, {})
