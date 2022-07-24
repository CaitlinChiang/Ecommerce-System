import { ReactElement } from 'react'
import layout from '../../layouts/customer'
import ProductsCards from '../../components/products/View/cards'

const Page = (): ReactElement => {
  return (
    <>
      <ProductsCards featured={false} />
    </>
  )
}

export default layout(Page, { title: 'Shop' })
