import React, { ReactElement } from 'react'
import layout from '../../../../layouts'
import UpdateProduct from '../../../../components/products/Update'
import ProductVariantsTable from '../../../../components/productVariants/Showcase/table'

const Page = (): ReactElement => {
  return (
    <>
      <UpdateProduct />
      <ProductVariantsTable />
    </>
  )
}

export default layout(Page, {
  title: 'Update Product',
  backRoute: '/admin/products'
})
