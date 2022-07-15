import { ReactElement } from 'react'
import layout from '../../layouts'
import ProductsCards from '../../components/products/Showcase/cards'

const Page = (): ReactElement => {
  return (
    <>
      <ProductsCards featured={false} />
    </>
  )
}

export default layout(Page, { title: 'Shop' })
