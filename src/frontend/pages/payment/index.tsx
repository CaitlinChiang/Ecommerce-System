import { ReactElement } from 'react'
import layout from '../../layouts/customer'
import CreateOrder from '../../components/orders/Create'

const Page = (): ReactElement => {
  return (
    <>
      <CreateOrder />
    </>
  )
}

export default layout(Page, { title: 'Payment' })
