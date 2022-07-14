import { ReactElement } from 'react'
import layout from '../../layouts'
import ProductsCards from '../../components/products/Showcase/cards'

const Page = (): ReactElement => {
  return (
    <>
      <ProductsCards featured={true} />
    </>
  )
}

export default layout(Page, {})
