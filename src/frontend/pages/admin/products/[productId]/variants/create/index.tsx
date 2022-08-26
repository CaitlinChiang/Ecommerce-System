import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { AdminPermission } from '../../../../../../_enums/adminPermission'
import layout from '../../../../../../layouts/admin'
import AuthorizedAccess from '../../../../../../components/users/Authorization'
import CreateProductVariant from '../../../../../../components/productVariants/Create'

const Page = (): ReactElement => {
  const router = useRouter()
  const productId = router?.query?.productId as string

  return (
    <AuthorizedAccess permission={AdminPermission.CREATE_PRODUCT_VARIANT}>
      <CreateProductVariant _productId={productId} />
    </AuthorizedAccess>
  )
}

export default layout(Page, {
  title: 'Create Product Variant',
  backRoute: true
})
