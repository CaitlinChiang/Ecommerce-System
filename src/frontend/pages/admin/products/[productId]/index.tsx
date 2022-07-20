import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import layout from '../../../../layouts/admin'
import UpdateProduct from '../../../../components/products/Update'
import ProductVariantsTable from '../../../../components/productVariants/Showcase/table'

const Page = (): ReactElement => {
  const router = useRouter()
  const productId = router?.query?.productId as string

  return (
    <>
      <UpdateProduct _id={productId} />
      <Button
        color={'primary'}
        fullWidth
        onClick={(): void => {
          router.push('[productId]/variants/create', `${productId}/variants/create`)
        }}
        type='submit'
        variant={'contained'}
      >
        {'Create Product Variant'}
      </Button>
      <ProductVariantsTable _productId={productId} />
    </>
  )
}

export default layout(Page, {
  title: 'Update Product',
  backRoute: true
})
