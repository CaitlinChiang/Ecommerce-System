import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import layout from '../../../../../layouts'
import UpdateProductVariant from '../../../../../components/productVariants/Update'

const Page = (): ReactElement => {
  const router = useRouter()
  const productVariantId = router?.query?.productVariantId as string

  return (
    <>
      <UpdateProductVariant _id={productVariantId} />
    </>
  )
}

export default layout(Page, {
  title: 'Update Product Variant',
  backRoute: true
})
