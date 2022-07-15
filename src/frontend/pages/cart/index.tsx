import { ReactElement } from 'react'
import layout from '../../layouts/customer'
import Cart from '../../components/cart/Showcase'

const Page = (): ReactElement => {
  return (
    <>
      <Cart />
    </>
  )
}

export default layout(Page, { title: 'Cart' })
