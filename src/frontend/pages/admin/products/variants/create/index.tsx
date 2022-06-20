import React, { ReactElement } from 'react'
import layout from '../../../../../layouts'
import CreateProductVariant from '../../../../../components/productVariants/Create'

const Page = (): ReactElement => {
  return (
    <>
      <CreateProductVariant />
    </>
  )
}

export default layout(Page, {
  title: 'Create Product Variant',
  backRoute: '/admin/products/update/62b036fe3fcf87061111d52c'
})
