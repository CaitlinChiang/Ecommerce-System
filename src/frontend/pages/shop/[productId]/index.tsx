import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import layout from '../../../layouts/customer'
import ProductPage from '../../../components/products/View/page'

const Page = (): ReactElement => {
  const router = useRouter()
  const productId = router?.query?.productId as string

  return (
    <>
      <ProductPage _id={productId} />
    </>
  )
}

export default layout(Page, { title: 'Product', backRoute: true })
