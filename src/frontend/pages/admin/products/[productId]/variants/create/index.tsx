import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import layout from '../../../../../../layouts/admin'
import CreateProductVariant from '../../../../../../components/productVariants/Create'

const Page = (): ReactElement => {
  const router = useRouter()
  const productId = router?.query?.productId as string

  return (
    <>
      <CreateProductVariant _productId={productId} />
    </>
  )
}

export default layout(Page, {
  title: 'Create Product Variant',
  backRoute: true
})
