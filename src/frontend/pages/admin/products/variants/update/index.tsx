import React, { ReactElement } from 'react'
import layout from '../../../../../layouts'
import UpdateProductVariant from '../../../../../components/productVariants/Update'

const Page = (): ReactElement => {
  return (
    <>
      <UpdateProductVariant />
    </>
  )
}

export default layout(Page, {
  title: 'Create Product Variant',
  backRoute: '/admin/products/update/62b036fe3fcf87061111d52c'
})
