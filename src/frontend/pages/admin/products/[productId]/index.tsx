import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { AdminPermission } from '../../../../_enums/adminPermission'
import layout from '../../../../layouts/admin'
import AuthorizedAccess from '../../../../components/users/Authorization'
import UpdateProduct from '../../../../components/products/Update'
import ProductVariantsTable from '../../../../components/productVariants/View/table'
import { authenticateUser } from '../../../../_utils/auth/authenticateUser'

const Page = (): ReactElement => {
  const router = useRouter()
  const productId = router?.query?.productId as string

  return (
    <AuthorizedAccess permission={AdminPermission.VIEW_PRODUCT}>
      <UpdateProduct
        _id={productId}
        disabled={!authenticateUser(AdminPermission.UPDATE_PRODUCT)}
      />
      <Button
        color={'primary'}
        disabled={!authenticateUser(AdminPermission.CREATE_PRODUCT_VARIANT)}
        fullWidth
        onClick={(): void => {
          router.push('[productId]/variants/create', `${productId}/variants/create`)
        }}
        type={'submit'}
        variant={'contained'}
      >
        {'Create Product Variant'}
      </Button>
      {authenticateUser(AdminPermission.VIEW_PRODUCT_VARIANT) && (
        <ProductVariantsTable _productId={productId} />
      )}
    </AuthorizedAccess>
  )
}

export default layout(Page, {
  title: 'Update Product',
  backRoute: true
})
