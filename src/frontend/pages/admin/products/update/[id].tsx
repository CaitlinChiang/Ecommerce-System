import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import layout from '../../../../layouts'
import UpdateProduct from '../../../../components/products/Update'
import ProductVariantsTable from '../../../../components/productVariants/Showcase/table'

const Page = (): ReactElement => {
  const router = useRouter()

  return (
    <>
      <UpdateProduct />
      <Button
        color={'primary'}
        fullWidth
        onClick={() => router.push('62b036fe3fcf87061111d52c/variants/create')}
        type='submit'
        variant={'contained'}
      >
        {'Create Product Variant'}
      </Button>
      <ProductVariantsTable />
    </>
  )
}

export default layout(Page, {
  title: 'Update Product',
  backRoute: '/admin/products'
})
