import { ReactElement } from 'react'
import layout from '../../../../layouts/admin'
import CreateProduct from '../../../../components/products/Create'

const Page = (): ReactElement => {
  return (
    <>
      <CreateProduct />
    </>
  )
}

export default layout(Page, {
  title: 'Create Product',
  backRoute: true
})
