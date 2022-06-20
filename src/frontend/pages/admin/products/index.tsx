import React, { ReactElement } from 'react'
import layout from '../../../layouts'
import ProductsTable from '../../../components/products/Showcase/table'

const Page = (): ReactElement => {
  return (
    <>
      <ProductsTable />
    </>
  )
}

export default layout(Page, { title: 'Products' })
