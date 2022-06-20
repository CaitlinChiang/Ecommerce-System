import React, { ReactElement } from 'react'
import layout from '../../../../layouts'
import UpdateProduct from '../../../../components/products/Update'

const Page = (): ReactElement => {
  return (
    <>
      <UpdateProduct />
    </>
  )
}

export default layout(Page, {
  title: 'Update Product',
  backRoute: '/admin/products'
})
