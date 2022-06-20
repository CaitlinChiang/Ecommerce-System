import React, { ReactElement } from 'react'
import layout from '../../../../layouts'
import CreateProduct from '../../../../components/products/Create'

const Page = (): ReactElement => {
  return (
    <>
      <CreateProduct />
    </>
  )
}

export default layout(Page, { title: 'Create Product', backRoute: '/products' })
