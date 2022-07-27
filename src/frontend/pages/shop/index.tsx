import { ReactElement } from 'react'
import layout from '../../layouts/customer'
import ProductCards from '../../components/products/View/cards'

const Page = (): ReactElement => {
  return (
    <>
      <ProductCards featured={false} />
    </>
  )
}

export default layout(Page, { title: 'Shop' })
